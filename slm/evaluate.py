"""
Evaluation script for the WzrdBrain SLM.

Measures rule compliance on generated combos:
- Direction linking (target >98%)
- ONLY_FIRST rule compliance (target >99%)
- Valid moves only / no hallucinations (target >99%)
- Parseable output format (target >95%)

Usage:
    python slm/evaluate.py --model-path slm/outputs/wzrdbrain-slm/merged
    python slm/evaluate.py --model-path nazroll/wzrdbrain-slm
"""

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SLM_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from wzrdbrain.wzrdbrain import MOVES, only_first, rotating_moves, use_fakie

# Load config
with open(SLM_DIR / "config.yaml") as f:
    CONFIG = yaml.safe_load(f)

SYSTEM_PROMPT = CONFIG["data"]["system_prompt"].strip()

# Build lookup for display-name to canonical move mapping
ALL_MOVES = set(MOVES)

# Direction display names: "fakie" -> "back", "forward" -> "front"
DIRECTION_ALIASES = {"fakie": "back", "forward": "front", "front": "front", "back": "back"}
VALID_DIRECTIONS = {"front", "back", "fakie", "forward"}
VALID_STANCES = {"open", "closed"}


def parse_combo_from_text(text: str) -> list[dict[str, str]] | None:
    """
    Parse a numbered combo list from model output.

    Expected format:
        1. front open gazelle
        2. back closed tree
        ...

    Returns list of parsed tricks or None if unparseable.
    """
    # Find numbered lines
    pattern = r"^\d+\.\s+(.+)$"
    lines = re.findall(pattern, text, re.MULTILINE)

    if not lines:
        return None

    tricks = []
    for line in lines:
        parts = line.strip().lower().split()
        if not parts:
            continue

        trick: dict[str, str] = {}

        # Parse direction (first token)
        if parts[0] in VALID_DIRECTIONS:
            trick["direction"] = DIRECTION_ALIASES.get(parts[0], parts[0])
            trick["display_direction"] = parts[0]
            parts = parts[1:]

        # Parse stance (next token if applicable)
        if parts and parts[0] in VALID_STANCES:
            trick["stance"] = parts[0]
            parts = parts[1:]

        # Remaining tokens are the move name
        if parts:
            trick["move"] = " ".join(parts)

        tricks.append(trick)

    return tricks if tricks else None


def check_valid_moves(tricks: list[dict[str, str]]) -> tuple[int, int, list[str]]:
    """Check that all moves are valid (no hallucinations)."""
    valid = 0
    total = len(tricks)
    invalid_moves = []

    for trick in tricks:
        move = trick.get("move", "")
        if move in ALL_MOVES:
            valid += 1
        else:
            invalid_moves.append(move)

    return valid, total, invalid_moves


def check_only_first_rule(tricks: list[dict[str, str]]) -> tuple[int, int]:
    """Check that ONLY_FIRST moves don't appear after position 0."""
    violations = 0
    checks = 0

    for i, trick in enumerate(tricks):
        if i == 0:
            continue
        checks += 1
        move = trick.get("move", "")
        if move in only_first:
            violations += 1

    return checks - violations, checks


def check_direction_linking(tricks: list[dict[str, str]]) -> tuple[int, int]:
    """Check that exit directions match entry directions between consecutive tricks."""
    correct = 0
    checks = 0

    for i in range(len(tricks) - 1):
        checks += 1
        current = tricks[i]
        next_trick = tricks[i + 1]

        current_move = current.get("move", "")
        current_dir = current.get("direction", "")
        next_dir = next_trick.get("direction", "")

        # Determine expected exit direction
        if current_move in rotating_moves:
            expected_exit = "back" if current_dir == "front" else "front"
        else:
            expected_exit = current_dir

        if expected_exit == next_dir:
            correct += 1

    return correct, checks


def generate_test_prompts(count: int = 100) -> list[str]:
    """Generate diverse test prompts."""
    prompts = []
    for i in range(count):
        n = (i % 4) + 2  # 2-5 tricks
        templates = [
            f"Generate a {n}-trick combo.",
            f"Give me a {n}-trick wizard skating combo.",
            f"Create a combo with {n} tricks.",
            f"I want a {n}-trick combo please.",
        ]
        prompts.append(templates[i % len(templates)])
    return prompts


def run_inference(model_path: str, prompts: list[str]) -> list[str]:
    """Run inference on a list of prompts and return model outputs."""
    from transformers import AutoModelForCausalLM, AutoTokenizer

    print(f"Loading model from {model_path}...")
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        torch_dtype="auto",
        device_map="auto",
    )

    outputs = []
    for i, prompt in enumerate(prompts):
        if (i + 1) % 10 == 0:
            print(f"  Generating {i + 1}/{len(prompts)}...")

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ]

        input_text = tokenizer.apply_chat_template(
            messages, tokenize=False, add_generation_prompt=True
        )
        inputs = tokenizer(input_text, return_tensors="pt").to(model.device)

        with __import__("torch").no_grad():
            generated = model.generate(
                **inputs,
                max_new_tokens=512,
                temperature=0.7,
                top_p=0.9,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id,
            )

        # Decode only the new tokens
        output = tokenizer.decode(
            generated[0][inputs["input_ids"].shape[1]:],
            skip_special_tokens=True,
        )
        outputs.append(output)

    return outputs


def evaluate_outputs(
    prompts: list[str], outputs: list[str]
) -> dict[str, float]:
    """Evaluate model outputs for rule compliance."""
    results = {
        "total_prompts": len(prompts),
        "parseable": 0,
        "valid_moves_correct": 0,
        "valid_moves_total": 0,
        "only_first_correct": 0,
        "only_first_total": 0,
        "direction_correct": 0,
        "direction_total": 0,
        "invalid_moves_seen": [],
    }

    for prompt, output in zip(prompts, outputs):
        tricks = parse_combo_from_text(output)

        if tricks is None or len(tricks) == 0:
            continue

        results["parseable"] += 1

        # Check valid moves
        valid, total, invalid = check_valid_moves(tricks)
        results["valid_moves_correct"] += valid
        results["valid_moves_total"] += total
        results["invalid_moves_seen"].extend(invalid)

        # Check ONLY_FIRST rule
        correct, checks = check_only_first_rule(tricks)
        results["only_first_correct"] += correct
        results["only_first_total"] += checks

        # Check direction linking
        correct, checks = check_direction_linking(tricks)
        results["direction_correct"] += correct
        results["direction_total"] += checks

    # Calculate rates
    total = results["total_prompts"]
    metrics = {
        "parseable_rate": results["parseable"] / total if total > 0 else 0,
        "valid_moves_rate": (
            results["valid_moves_correct"] / results["valid_moves_total"]
            if results["valid_moves_total"] > 0
            else 0
        ),
        "only_first_rate": (
            results["only_first_correct"] / results["only_first_total"]
            if results["only_first_total"] > 0
            else 0
        ),
        "direction_linking_rate": (
            results["direction_correct"] / results["direction_total"]
            if results["direction_total"] > 0
            else 0
        ),
    }

    return metrics


def print_results(metrics: dict[str, float]) -> None:
    """Print evaluation results with pass/fail indicators."""
    targets = {
        "parseable_rate": 0.95,
        "valid_moves_rate": 0.99,
        "only_first_rate": 0.99,
        "direction_linking_rate": 0.98,
    }

    labels = {
        "parseable_rate": "Parseable output",
        "valid_moves_rate": "Valid moves (no hallucinations)",
        "only_first_rate": "ONLY_FIRST rule compliance",
        "direction_linking_rate": "Direction linking",
    }

    print("\n" + "=" * 60)
    print("WzrdBrain SLM Evaluation Results")
    print("=" * 60)

    all_pass = True
    for key, target in targets.items():
        value = metrics.get(key, 0)
        status = "PASS" if value >= target else "FAIL"
        if status == "FAIL":
            all_pass = False
        print(f"  {labels[key]:40s} {value:6.1%}  (target: {target:.0%})  [{status}]")

    print("=" * 60)
    print(f"  Overall: {'ALL PASS' if all_pass else 'SOME FAILURES'}")
    print("=" * 60)


def main() -> None:
    parser = argparse.ArgumentParser(description="Evaluate WzrdBrain SLM")
    parser.add_argument(
        "--model-path",
        type=str,
        required=True,
        help="Path to merged model or HF repo ID",
    )
    parser.add_argument(
        "--num-prompts",
        type=int,
        default=100,
        help="Number of test prompts to generate",
    )
    parser.add_argument(
        "--output",
        type=str,
        default=None,
        help="Path to save detailed results JSON",
    )
    args = parser.parse_args()

    # Generate test prompts
    prompts = generate_test_prompts(args.num_prompts)
    print(f"Generated {len(prompts)} test prompts")

    # Run inference
    outputs = run_inference(args.model_path, prompts)

    # Evaluate
    metrics = evaluate_outputs(prompts, outputs)
    print_results(metrics)

    # Save detailed results
    if args.output:
        results = {
            "metrics": metrics,
            "samples": [
                {"prompt": p, "output": o} for p, o in zip(prompts[:10], outputs[:10])
            ],
        }
        with open(args.output, "w") as f:
            json.dump(results, f, indent=2)
        print(f"\nDetailed results saved to {args.output}")


if __name__ == "__main__":
    main()
