"""
Synthetic training data generator for the WzrdBrain SLM.

Generates ~9,000 validated training examples across 5 categories:
A. Simple combo generation (5,000)
B. Constrained generation (3,000)
C. Trick explanations (500)
D. Rule explanations (300)
E. Learning progressions (200)

Output: JSONL files in HuggingFace chat format.
"""

import json
import random
import sys
from pathlib import Path
from typing import Any

import yaml

# Add the project root so we can import wzrdbrain
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from wzrdbrain.wzrdbrain import (
    DIRECTIONS,
    MOVES,
    STANCES,
    SUBSEQUENT_MOVES,
    Trick,
    exclude_stance,
    generate_combo,
    only_first,
    rotating_moves,
    use_fakie,
)

SLM_DIR = Path(__file__).resolve().parent

# Load config
with open(SLM_DIR / "config.yaml") as f:
    CONFIG = yaml.safe_load(f)

SYSTEM_PROMPT = CONFIG["data"]["system_prompt"].strip()

# Load knowledge files
with open(SLM_DIR / "knowledge" / "trick_descriptions.json") as f:
    TRICK_DESCRIPTIONS: dict[str, Any] = json.load(f)

with open(SLM_DIR / "knowledge" / "learning_progressions.json") as f:
    LEARNING_PROGRESSIONS: dict[str, Any] = json.load(f)


def format_combo_as_text(combo: list[dict[str, Any]]) -> str:
    """Format a combo as a numbered list of trick names."""
    lines = []
    for i, trick in enumerate(combo, 1):
        lines.append(f"{i}. {trick['name']}")
    return "\n".join(lines)


def format_combo_detailed(combo: list[dict[str, Any]]) -> str:
    """Format a combo with direction linking details."""
    lines = []
    for i, trick in enumerate(combo, 1):
        lines.append(f"{i}. {trick['name']}")
        if i < len(combo):
            lines.append(f"   (exit: {trick['exit_from_trick']} → next entry: {trick['exit_from_trick']})")
    return "\n".join(lines)


def make_chat(user_msg: str, assistant_msg: str) -> dict[str, Any]:
    """Create a chat-format training example."""
    return {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
            {"role": "assistant", "content": assistant_msg},
        ]
    }


# ---------------------------------------------------------------------------
# Category A: Simple combo generation
# ---------------------------------------------------------------------------

COMBO_PROMPTS = [
    "Generate a {n}-trick combo.",
    "Give me a {n}-trick wizard skating combo.",
    "Create a combo with {n} tricks.",
    "I want a {n}-trick combo please.",
    "Show me a {n}-trick combination.",
    "What's a good {n}-trick combo?",
    "Can you make a {n}-trick combo?",
    "Hit me with a {n}-trick combo.",
    "Generate {n} linked tricks.",
    "I need a {n}-trick wizard combo.",
    "Throw me a {n}-trick combo.",
    "Make a random {n}-trick combo.",
    "Come up with {n} tricks that flow together.",
    "Give me {n} linked wizard skating tricks.",
    "What would a {n}-trick combo look like?",
    "Surprise me with a {n}-trick combo.",
    "Build me a combo of {n} tricks.",
    "Put together {n} wizard tricks.",
    "I'm looking for a {n}-trick combo.",
    "Generate a wizard skating sequence with {n} tricks.",
]

COMBO_RESPONSE_TEMPLATES = [
    "Here's a {n}-trick combo:\n\n{combo}",
    "Here you go! A {n}-trick combo:\n\n{combo}",
    "Check out this {n}-trick combo:\n\n{combo}",
    "Here's a {n}-trick combination for you:\n\n{combo}",
    "{combo}",
]


def generate_simple_combos(count: int) -> list[dict[str, Any]]:
    """Generate simple combo request/response pairs."""
    examples = []
    for _ in range(count):
        n = random.randint(2, 5)
        combo = generate_combo(n)
        prompt_template = random.choice(COMBO_PROMPTS)
        response_template = random.choice(COMBO_RESPONSE_TEMPLATES)

        user_msg = prompt_template.format(n=n)
        combo_text = format_combo_as_text(combo)
        assistant_msg = response_template.format(n=n, combo=combo_text)

        examples.append(make_chat(user_msg, assistant_msg))
    return examples


# ---------------------------------------------------------------------------
# Category B: Constrained combo generation
# ---------------------------------------------------------------------------

CONSTRAINED_PROMPTS_MOVE = [
    "Give me a {n}-trick combo that starts with {move}.",
    "Generate a {n}-trick combo starting with a {move}.",
    "I want a combo beginning with {move}, {n} tricks total.",
    "Create a {n}-trick combo with {move} as the first trick.",
    "Build me a {n}-trick combo that opens with {move}.",
    "Make a combo that starts with {move}. {n} tricks.",
    "Start a {n}-trick combo with {move}.",
    "{n} tricks starting with {move} please.",
]

CONSTRAINED_PROMPTS_INCLUDE = [
    "Give me a combo that includes a {move}.",
    "I want a combo with a {move} in it.",
    "Generate a combo that has a {move} somewhere.",
    "Can you make a combo featuring a {move}?",
    "Create a combo that uses {move}.",
    "I'd like to see a combo with {move}.",
]

CONSTRAINED_RESPONSE_TEMPLATES = [
    "Here's a combo with {move}:\n\n{combo}",
    "Here you go:\n\n{combo}",
    "Check this out:\n\n{combo}",
    "Here's what I came up with:\n\n{combo}",
]


def generate_constrained_combo_start(move: str, n: int) -> list[dict[str, Any]] | None:
    """Generate a combo that starts with a specific move."""
    try:
        first_trick = Trick(move=move)
    except ValueError:
        return None

    tricks = [first_trick]
    for _ in range(n - 1):
        prev = tricks[-1]
        next_move = random.choice(list(SUBSEQUENT_MOVES))
        next_trick = Trick(direction=prev.exit_from_trick, move=next_move)
        tricks.append(next_trick)

    return [t.to_dict() for t in tricks]


def generate_constrained_combo_include(move: str, n: int) -> list[dict[str, Any]] | None:
    """Generate a combo that includes a specific move (not necessarily first)."""
    if move in only_first:
        # ONLY_FIRST moves must be first
        return generate_constrained_combo_start(move, n)

    # Place the constrained move at a random non-first position
    target_pos = random.randint(1, n - 1)
    tricks: list[Trick] = []

    for i in range(n):
        if i == 0:
            first_move = random.choice(list(MOVES))
            tricks.append(Trick(move=first_move))
        elif i == target_pos:
            prev = tricks[-1]
            tricks.append(Trick(direction=prev.exit_from_trick, move=move))
        else:
            prev = tricks[-1]
            valid = list(SUBSEQUENT_MOVES)
            next_move = random.choice(valid)
            tricks.append(Trick(direction=prev.exit_from_trick, move=next_move))

    return [t.to_dict() for t in tricks]


def generate_constrained_combos(count: int) -> list[dict[str, Any]]:
    """Generate constrained combo request/response pairs."""
    examples = []
    all_moves = list(MOVES)

    for _ in range(count):
        move = random.choice(all_moves)
        n = random.randint(2, 5)

        # 60% start-with, 40% include
        if random.random() < 0.6:
            combo_dicts = generate_constrained_combo_start(move, n)
            if combo_dicts is None:
                continue
            prompt_template = random.choice(CONSTRAINED_PROMPTS_MOVE)
            user_msg = prompt_template.format(n=n, move=move)
        else:
            combo_dicts = generate_constrained_combo_include(move, n)
            if combo_dicts is None:
                continue
            prompt_template = random.choice(CONSTRAINED_PROMPTS_INCLUDE)
            user_msg = prompt_template.format(move=move)

        combo_text = format_combo_as_text(combo_dicts)
        response_template = random.choice(CONSTRAINED_RESPONSE_TEMPLATES)
        assistant_msg = response_template.format(move=move, combo=combo_text)

        examples.append(make_chat(user_msg, assistant_msg))
    return examples


# ---------------------------------------------------------------------------
# Category C: Trick explanations
# ---------------------------------------------------------------------------

EXPLAIN_PROMPTS = [
    "What is a {move}?",
    "Explain the {move} trick.",
    "Tell me about {move}.",
    "How do you do a {move}?",
    "What's the {move} move?",
    "Describe the {move} trick.",
    "Can you explain {move}?",
    "What does {move} mean in wizard skating?",
    "I don't know what a {move} is. Can you explain?",
    "Break down the {move} for me.",
]


def generate_trick_explanation(move: str) -> str:
    """Generate an explanation for a given move using knowledge base."""
    info = TRICK_DESCRIPTIONS.get(move, {})
    desc = info.get("description", f"A wizard skating move called {move}.")
    difficulty = info.get("difficulty", "intermediate")
    category = info.get("category", "move")
    notes = info.get("notes", "")
    rules = info.get("rules", [])

    parts = [f"**{move.title()}** is a {difficulty}-level {category} in wizard skating."]
    parts.append(desc)

    if notes:
        parts.append(notes)

    if "ROTATING_MOVES" in rules:
        parts.append(
            "As a rotating move, it flips your direction — "
            "if you enter going front, you'll exit going back, and vice versa."
        )

    if "ONLY_FIRST" in rules:
        parts.append("This move can only appear as the first trick in a combo.")

    if "USE_FAKIE" in rules:
        parts.append(
            "When going back, this trick is displayed as 'fakie'; "
            "when going front, it's displayed as 'forward'."
        )

    parts.append(f"Difficulty: {difficulty}.")

    return " ".join(parts)


def generate_trick_explanations(count: int) -> list[dict[str, Any]]:
    """Generate trick explanation training examples."""
    examples = []
    moves = list(TRICK_DESCRIPTIONS.keys())

    for _ in range(count):
        move = random.choice(moves)
        prompt_template = random.choice(EXPLAIN_PROMPTS)
        user_msg = prompt_template.format(move=move)
        assistant_msg = generate_trick_explanation(move)
        examples.append(make_chat(user_msg, assistant_msg))

    return examples


# ---------------------------------------------------------------------------
# Category D: Rule explanations
# ---------------------------------------------------------------------------

RULE_EXPLANATIONS = [
    # Direction linking
    {
        "prompts": [
            "How does direction linking work in combos?",
            "Explain how tricks connect in a combo.",
            "What are the rules for linking tricks?",
            "How do tricks flow together in wizard skating?",
        ],
        "response": (
            "In wizard skating combos, tricks are linked by their directions. "
            "Each trick has an entry direction and an exit direction (front or back). "
            "The exit direction of one trick must match the entry direction of the next trick. "
            "This creates a natural flow — if you exit a trick going back, the next trick "
            "must be entered going back. Rotating moves (like gazelle, lion, 180, 540, stunami, "
            "and ufo swivel) flip your direction, so if you enter going front, you exit going back. "
            "This direction linking is what makes combos feel connected and smooth."
        ),
    },
    # ONLY_FIRST rule
    {
        "prompts": [
            "What is the ONLY_FIRST rule?",
            "Why can some moves only be first in a combo?",
            "Which moves can only start a combo?",
            "Tell me about moves that can only be the first trick.",
        ],
        "response": (
            "The ONLY_FIRST rule applies to three moves: predator, predator one, and parallel. "
            "These moves can only appear as the first trick in a combo. They are foundational "
            "stances that serve as starting positions. You wouldn't transition into a predator "
            "stance mid-combo because it disrupts the flow — it's meant to be a setup position "
            "that launches you into the rest of your tricks."
        ),
    },
    # USE_FAKIE rule
    {
        "prompts": [
            "What does fakie mean?",
            "Why do some tricks say 'fakie' or 'forward'?",
            "Explain the fakie/forward naming convention.",
            "How does the USE_FAKIE rule work?",
        ],
        "response": (
            "In wizard skating, certain moves use 'fakie' and 'forward' instead of 'back' and 'front' "
            "for their direction display. When going backwards, these tricks are called 'fakie' (e.g., "
            "'fakie 360'), and when going forwards, they're called 'forward' (e.g., 'forward soul slide'). "
            "This applies to spins (180, 360, 540), presses (toe press, heel press), rolls (toe roll, "
            "heel roll), and all slides. It's a naming convention from skating culture — 'fakie' means "
            "rolling backwards, which is the traditional term."
        ),
    },
    # Rotating moves
    {
        "prompts": [
            "What are rotating moves?",
            "Which moves change your direction?",
            "How do rotating moves work?",
            "Explain rotation in wizard skating combos.",
        ],
        "response": (
            "Rotating moves are tricks that flip your facing direction by 180 degrees. "
            "The rotating moves are: gazelle, lion, 180, 540, stunami, and ufo swivel. "
            "If you enter a rotating move going front, you'll exit going back, and vice versa. "
            "This is critical for combo planning — a rotating move changes what direction "
            "the next trick will start from. For example, a front gazelle exits back, so the "
            "next trick must enter going back. Non-rotating moves (like tree, toe press, 360) "
            "exit in the same direction they entered."
        ),
    },
    # Stance rules
    {
        "prompts": [
            "What are open and closed stances?",
            "Which moves have stance variations?",
            "How do stances work in wizard skating?",
            "Explain open vs closed stance.",
        ],
        "response": (
            "Many wizard skating moves can be performed in either an 'open' or 'closed' stance. "
            "Open stance means your body is more spread out, while closed stance means a tighter, "
            "more compact position. However, not all moves have stance variations. Predator and "
            "predator one don't use stances (they have their own fixed stance). All USE_FAKIE moves "
            "(spins, presses, rolls, and slides) also don't have open/closed variations. Moves like "
            "tree, gazelle, lion, stunami, ufo swivel, toe pivot, and heel pivot all have both "
            "open and closed stance options."
        ),
    },
    # Valid moves list
    {
        "prompts": [
            "What are all the wizard skating moves?",
            "List all the moves in wizard skating.",
            "How many moves are there?",
            "What tricks can I do in wizard skating?",
        ],
        "response": (
            "There are 26 wizard skating moves:\n\n"
            "**Stances:** predator, predator one, parallel, tree\n"
            "**Transitions:** gazelle, gazelle s, lion, lion s, stunami, ufo swivel\n"
            "**Presses:** toe press, heel press\n"
            "**Rolls:** toe roll, heel roll\n"
            "**Spins:** 180, 360, 540\n"
            "**Slides:** parallel slide, soul slide, acid slide, mizu slide, star slide, fast slide, back slide\n"
            "**Pivots:** toe pivot, heel pivot\n\n"
            "Each move has its own rules about direction, stance, and positioning in combos."
        ),
    },
    # How combos work generally
    {
        "prompts": [
            "How do wizard skating combos work?",
            "What makes a valid combo?",
            "Explain combo rules.",
            "What are the rules for making combos?",
        ],
        "response": (
            "A wizard skating combo is a sequence of 2-5 linked tricks. Here are the key rules:\n\n"
            "1. **Direction linking**: Each trick's exit direction must match the next trick's entry direction.\n"
            "2. **ONLY_FIRST rule**: Predator, predator one, and parallel can only be the first trick.\n"
            "3. **Rotating moves**: Gazelle, lion, 180, 540, stunami, and ufo swivel flip your direction "
            "(front→back or back→front).\n"
            "4. **Stances**: Some moves have open/closed stance variations, others don't.\n"
            "5. **Display names**: Some moves show 'fakie'/'forward' instead of 'back'/'front'.\n\n"
            "A good combo has smooth flow — the direction links create natural transitions between tricks."
        ),
    },
]


def generate_rule_explanations(count: int) -> list[dict[str, Any]]:
    """Generate rule explanation training examples."""
    examples = []
    for _ in range(count):
        rule = random.choice(RULE_EXPLANATIONS)
        prompt = random.choice(rule["prompts"])
        examples.append(make_chat(prompt, rule["response"]))
    return examples


# ---------------------------------------------------------------------------
# Category E: Learning progressions
# ---------------------------------------------------------------------------

PROGRESSION_PROMPTS = [
    "I'm a beginner. What should I learn first?",
    "What's the learning order for wizard skating moves?",
    "How should I progress in wizard skating?",
    "What difficulty level is {move}?",
    "What moves should I learn at {level} level?",
    "I can do {move}. What should I learn next?",
    "Give me a learning progression for wizard skating.",
    "What tier is {move} in?",
    "What's the progression path from beginner to expert?",
    "I'm at the {level_name} level. What combos should I practice?",
]


def generate_tier_explanation(tier: dict[str, Any]) -> str:
    """Generate an explanation for a difficulty tier."""
    parts = [
        f"**Level {tier['level']}: {tier['name']}**\n",
        f"{tier['description']}\n",
        f"Moves at this level: {', '.join(tier['moves'])}.\n",
        f"Key skills to develop: {', '.join(tier['skills'])}.\n",
        "Suggested practice combos:",
    ]
    for suggestion in tier["suggested_combos"]:
        parts.append(f"- {suggestion}")
    return "\n".join(parts)


def generate_full_progression() -> str:
    """Generate the full learning progression overview."""
    parts = ["Here's the wizard skating learning progression from beginner to expert:\n"]
    for tier in LEARNING_PROGRESSIONS["tiers"]:
        parts.append(f"**Level {tier['level']} - {tier['name']}**: {', '.join(tier['moves'])}")
    parts.append("\n" + "\n".join(LEARNING_PROGRESSIONS["progression_tips"]))
    return "\n".join(parts)


def find_move_tier(move: str) -> dict[str, Any] | None:
    """Find which tier a move belongs to."""
    for tier in LEARNING_PROGRESSIONS["tiers"]:
        if move in tier["moves"]:
            return tier
    return None


def find_next_tier(move: str) -> dict[str, Any] | None:
    """Find the next tier after a move's current tier."""
    current = find_move_tier(move)
    if current is None:
        return None
    target_level = current["level"] + 1
    for tier in LEARNING_PROGRESSIONS["tiers"]:
        if tier["level"] == target_level:
            return tier
    return None


def generate_progression_examples(count: int) -> list[dict[str, Any]]:
    """Generate learning progression training examples."""
    examples = []
    tiers = LEARNING_PROGRESSIONS["tiers"]
    tier_names = {t["level"]: t["name"] for t in tiers}
    all_moves = list(TRICK_DESCRIPTIONS.keys())

    for _ in range(count):
        prompt_type = random.randint(0, 5)

        if prompt_type == 0:
            # Beginner question
            user_msg = random.choice([
                "I'm a beginner. What should I learn first?",
                "I'm new to wizard skating. Where do I start?",
                "What are the easiest moves to learn first?",
            ])
            tier = tiers[0]
            assistant_msg = generate_tier_explanation(tier)

        elif prompt_type == 1:
            # Full progression
            user_msg = random.choice([
                "Give me the full learning progression.",
                "What's the learning order for wizard skating?",
                "How should I progress from beginner to expert?",
            ])
            assistant_msg = generate_full_progression()

        elif prompt_type == 2:
            # Specific move difficulty
            move = random.choice(all_moves)
            user_msg = f"What difficulty level is {move}?"
            info = TRICK_DESCRIPTIONS[move]
            tier = find_move_tier(move)
            tier_info = f" (Level {tier['level']}: {tier['name']})" if tier else ""
            assistant_msg = (
                f"**{move.title()}** is a {info['difficulty']}-level move{tier_info}. "
                f"{info['description']}"
            )

        elif prompt_type == 3:
            # What to learn next
            move = random.choice(all_moves)
            user_msg = f"I can do {move}. What should I learn next?"
            next_tier = find_next_tier(move)
            if next_tier:
                assistant_msg = (
                    f"Great job mastering {move}! Next, you should work on "
                    f"Level {next_tier['level']}: {next_tier['name']}.\n\n"
                    + generate_tier_explanation(next_tier)
                )
            else:
                assistant_msg = (
                    f"You've mastered {move} — that's expert level! "
                    f"Focus on building creative combos that chain all your skills together. "
                    f"Try 4-5 trick combos mixing stances, transitions, spins, and slides."
                )

        elif prompt_type == 4:
            # Specific tier question
            tier = random.choice(tiers)
            user_msg = f"What moves should I learn at {tier['name'].lower()} level?"
            assistant_msg = generate_tier_explanation(tier)

        else:
            # Combo suggestions for a level
            tier = random.choice(tiers)
            user_msg = f"I'm at the {tier['name']} level. What combos should I practice?"
            assistant_msg = (
                f"At the {tier['name']} level, here are some combos to practice:\n\n"
            )
            for suggestion in tier["suggested_combos"]:
                assistant_msg += f"- {suggestion}\n"
            assistant_msg += (
                f"\nKey skills to develop: {', '.join(tier['skills'])}."
            )

        examples.append(make_chat(user_msg, assistant_msg))

    return examples


# ---------------------------------------------------------------------------
# Main data generation pipeline
# ---------------------------------------------------------------------------

def validate_combo_example(example: dict[str, Any]) -> bool:
    """Validate that a training example contains a properly formatted combo."""
    # Just check that the example has the expected chat structure
    messages = example.get("messages", [])
    if len(messages) != 3:
        return False
    if messages[0]["role"] != "system":
        return False
    if messages[1]["role"] != "user":
        return False
    if messages[2]["role"] != "assistant":
        return False
    return True


def split_data(
    examples: list[dict[str, Any]], val_ratio: float = 0.1, test_count: int = 200
) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:
    """Split examples into train/val/test sets."""
    random.shuffle(examples)

    test = examples[:test_count]
    remaining = examples[test_count:]

    val_count = int(len(remaining) * val_ratio)
    val = remaining[:val_count]
    train = remaining[val_count:]

    return train, val, test


def save_jsonl(data: list[dict[str, Any]], filepath: Path) -> None:
    """Save data as JSONL."""
    with open(filepath, "w") as f:
        for item in data:
            f.write(json.dumps(item) + "\n")


def main() -> None:
    random.seed(CONFIG["training"]["seed"])

    gen_config = CONFIG["generation"]
    print("Generating synthetic training data for WzrdBrain SLM...")

    # Category A: Simple combos
    print(f"  A. Generating {gen_config['combo_count']} simple combo examples...")
    simple_combos = generate_simple_combos(gen_config["combo_count"])
    print(f"     Generated: {len(simple_combos)}")

    # Category B: Constrained combos
    print(f"  B. Generating {gen_config['constrained_count']} constrained combo examples...")
    constrained_combos = generate_constrained_combos(gen_config["constrained_count"])
    print(f"     Generated: {len(constrained_combos)}")

    # Category C: Trick explanations
    print(f"  C. Generating {gen_config['explanation_count']} trick explanation examples...")
    explanations = generate_trick_explanations(gen_config["explanation_count"])
    print(f"     Generated: {len(explanations)}")

    # Category D: Rule explanations
    print(f"  D. Generating {gen_config['rule_count']} rule explanation examples...")
    rules = generate_rule_explanations(gen_config["rule_count"])
    print(f"     Generated: {len(rules)}")

    # Category E: Learning progressions
    print(f"  E. Generating {gen_config['progression_count']} progression examples...")
    progressions = generate_progression_examples(gen_config["progression_count"])
    print(f"     Generated: {len(progressions)}")

    # Combine all
    all_examples = simple_combos + constrained_combos + explanations + rules + progressions
    print(f"\nTotal examples: {len(all_examples)}")

    # Validate
    valid = [ex for ex in all_examples if validate_combo_example(ex)]
    print(f"Valid examples: {len(valid)}")

    # Split
    train, val, test = split_data(valid)
    print(f"Train: {len(train)}, Val: {len(val)}, Test: {len(test)}")

    # Save
    data_dir = SLM_DIR / "data"
    data_dir.mkdir(exist_ok=True)

    save_jsonl(train, data_dir / "train.jsonl")
    save_jsonl(val, data_dir / "val.jsonl")
    save_jsonl(test, data_dir / "test.jsonl")

    print(f"\nData saved to {data_dir}/")

    # Print a few samples
    print("\n--- Sample training examples ---")
    for i, sample in enumerate(random.sample(train, min(3, len(train)))):
        print(f"\nSample {i + 1}:")
        print(f"  User: {sample['messages'][1]['content'][:100]}")
        print(f"  Asst: {sample['messages'][2]['content'][:100]}")


if __name__ == "__main__":
    main()
