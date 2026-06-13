"""
Physical-continuity simulation for wzrdbrain's combo generator.

Generates many combos and measures, across every adjacent trick pair, how often the
previous trick's exit state contradicts the next trick's entry requirement on each
physical dimension (direction / edge / stance / point). It also reports the
distribution of the ``transition`` annotation the generator attaches to each link.

This is a diagnostic/reporting script, not a pytest module — run it directly:

    ./venv/bin/python tests/simulate_continuity.py [--combos N] [--length L] [--seed S]

The companion assertion-based guarantees live in test_wzrdbrain.py
(test_strict_links_are_fully_continuous, test_strict_links_dominate).
"""

import argparse
import random
from collections import Counter
from dataclasses import dataclass, field

from wzrdbrain.wzrdbrain import generate_combo

DIMENSIONS = ("direction", "edge", "stance", "point")


@dataclass
class SimulationResult:
    total_pairs: int = 0
    mismatches: dict[str, int] = field(default_factory=lambda: {d: 0 for d in DIMENSIONS})
    transitions: Counter[str] = field(default_factory=Counter)
    strict_pairs: int = 0
    strict_mismatches: dict[str, int] = field(default_factory=lambda: {d: 0 for d in DIMENSIONS})


def run(num_combos: int, length: int, seed: int) -> SimulationResult:
    random.seed(seed)
    result = SimulationResult()

    for _ in range(num_combos):
        combo = generate_combo(length)
        for trick in combo:
            result.transitions[trick["transition"]] += 1
        for current, nxt in zip(combo, combo[1:]):
            result.total_pairs += 1
            is_strict = nxt["transition"] == "linked"
            if is_strict:
                result.strict_pairs += 1
            for dim in DIMENSIONS:
                if current["exit"][dim] != nxt["entry"][dim]:
                    result.mismatches[dim] += 1
                    if is_strict:
                        result.strict_mismatches[dim] += 1

    return result


def _pct(n: int, d: int) -> str:
    return f"{(100 * n / d):.1f}%" if d else "n/a"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--combos", type=int, default=2000, help="number of combos to generate")
    parser.add_argument("--length", type=int, default=5, help="tricks per combo")
    parser.add_argument("--seed", type=int, default=42, help="RNG seed for reproducibility")
    args = parser.parse_args()

    result = run(args.combos, args.length, args.seed)
    total = result.total_pairs

    print(f"combos={args.combos} length={args.length} seed={args.seed}")
    print(f"adjacent trick pairs: {total}")
    print()
    print("=== mismatches across ALL links (any tier) ===")
    for dim in DIMENSIONS:
        c = result.mismatches[dim]
        print(f"  {dim:10s}: {c:6d} ({_pct(c, total)})")
    print()
    print("=== transition annotation distribution ===")
    grand = sum(result.transitions.values())
    for label, c in result.transitions.most_common():
        print(f"  {label:10s}: {c:6d} ({_pct(c, grand)})")
    print()
    strict_pairs = result.strict_pairs
    print("=== mismatches on 'linked' (strict) links only — should be 0 ===")
    print(f"  strict links: {strict_pairs} ({_pct(strict_pairs, total)} of all links)")
    for dim in DIMENSIONS:
        c = result.strict_mismatches[dim]
        print(f"  {dim:10s}: {c:6d} ({_pct(c, strict_pairs)})")


if __name__ == "__main__":
    main()
