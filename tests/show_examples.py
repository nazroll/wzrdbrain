"""
Prints a handful of example combos from wzrdbrain's combo generator, showing the
physical state flow (direction/edge/stance/point) and the ``transition`` annotation
on every link.

This is a demo/inspection script, not a pytest module — run it directly:

    ./venv/bin/python tests/show_examples.py [--count N] [--length L] [--seed S]

Link markers:
    ●  start       first trick in the combo
    =  linked      edge + stance + point all carry over (fully continuous)
    ~  edge_shift  point carries over; the skater re-sets an edge/stance
    !  reset       direction only; the skater also re-distributes weight (point)
"""

import argparse
import random

from wzrdbrain.wzrdbrain import generate_combo

MARKER = {"start": "●", "linked": "=", "edge_shift": "~", "reset": "!"}


def _state(s: dict[str, str]) -> str:
    return f"{s['direction']}/{s['edge']}/{s['stance']}/{s['point']}"


def show(count: int, length: int, seed: int) -> None:
    random.seed(seed)
    print(f"{count} example combos x {length} tricks (seed {seed})")
    print("markers:  ● start   = linked   ~ edge_shift   ! reset")
    print()
    for n in range(1, count + 1):
        combo = generate_combo(length)
        print(f"Combo {n}:")
        for trick in combo:
            marker = MARKER[trick["transition"]]
            flow = f"{_state(trick['entry']):>24} -> {_state(trick['exit'])}"
            print(f"  {marker} {trick['name']:<26} [{trick['category']:<10}] {flow}")
        links = " ".join(t["transition"] for t in combo[1:])
        print(f"    links: {links}")
        print()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--count", type=int, default=5, help="number of combos to print")
    parser.add_argument("--length", type=int, default=4, help="tricks per combo")
    parser.add_argument("--seed", type=int, default=7, help="RNG seed for reproducibility")
    args = parser.parse_args()
    show(args.count, args.length, args.seed)


if __name__ == "__main__":
    main()
