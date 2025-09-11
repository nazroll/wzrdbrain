import random
from typing import Optional
from dataclasses import dataclass, asdict

# Trick data definitions
direction = ("front", "back", "null")
stance = ("open", "closed", "switch")
move = (
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
)

# Moves that use "fakie" instead of "back"
use_fakie = {
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
}

# Moves that don't have an open/closed stance
exclude_stance = {
    "predator",
    "predator one",
}.union(use_fakie)


@dataclass
class Trick:
    direction: str
    stance: Optional[str]
    move: str
    enter_into_trick: str
    exit_from_trick: str

    def __str__(self):
        if self.stance:
            return f"{self.direction} {self.stance} {self.move}"
        return f"{self.direction} {self.move}"

    def to_dict(self):
        """Returns a dictionary representation of the trick, including its full name."""
        data = asdict(self)
        data['name'] = str(self)
        return data


# Generate a trick
def generate_trick() -> list[str]:
    selected_move = random.choice(move)
    trick = [random.choice(direction)]

    if selected_move not in exclude_stance:
        trick.append(random.choice(stance))

    trick.append(selected_move)
    return trick


# Generate a combination of tricks. Default setting is random, between 2-5 tricks.
def generate_combo(num_of_tricks: Optional[int] = None) -> list[str]:
    if num_of_tricks is None:
        num_of_tricks = random.randint(2, 5)

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
