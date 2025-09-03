import random
from typing import Optional

# Trick data definitions
direction = ["front", "back"]
stance = ["open", "closed"]
move = [
    "predator",
    "predator one",
    "parallel",
    "tree",
    "gazelle",
    "gazelle s",
    "lion",
    "lion s",
    "toe press",
    "heel press",
    "toe roll",
    "heel roll",
    "360",
    "180",
    "parallel slide",
    "soul slide",
    "acid slide",
    "mizu slide",
    "star slide",
    "fast slide",
    "back slide",
]
exclude_stance = [
    "predator",
    "predator one",
    "toe press",
    "toe roll",
    "heel press",
    "heel roll",
    "360",
    "180",
    "parallel slide",
    "soul slide",
    "acid slide",
    "mizu slide",
    "star slide",
    "fast slide",
    "back slide",
]
use_fakie = [
    "toe press",
    "toe roll",
    "heel press",
    "heel roll",
    "360",
    "180",
    "parallel slide",
    "soul slide",
    "acid slide",
    "mizu slide",
    "star slide",
    "fast slide",
    "back slide",
]


# Generate a trick
def generate_trick() -> list[str]:
    selected_move = random.choice(move)
    trick = [random.choice(direction)]

    if selected_move not in exclude_stance:
        trick.append(random.choice(stance))

    trick.append(selected_move)
    return trick


# Generate a combination of tricks. Default setting is random, between 1-5 tricks.
def generate_combo(num_of_tricks: Optional[int] = None) -> list[str]:
    if num_of_tricks is None:
        num_of_tricks = random.randint(1, 5)

    trick_line: list[str] = []
    for i in range(num_of_tricks):
        trick_parts = generate_trick()
        # If the move uses the fakie semantics, convert the direction "front"/"back" to "forward"/"fakie"
        if trick_parts:
            move_name = trick_parts[-1]
            if move_name in use_fakie:
                if trick_parts[0] == "back":
                    trick_parts[0] = "fakie"
                elif trick_parts[0] == "front":
                    trick_parts[0] = "forward"
        trick_line.append(" ".join(trick_parts))
    return trick_line
