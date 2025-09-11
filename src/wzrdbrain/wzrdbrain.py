import random
from typing import Optional
from dataclasses import dataclass, asdict

# Trick data definitions
DIRECTIONS = ("front", "back")
STANCES = ("open", "closed")
MOVES = (
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
    direction: Optional[str] = None
    stance: Optional[str] = None
    move: Optional[str] = None
    enter_into_trick: Optional[str] = None
    exit_from_trick: Optional[str] = None

    def __post_init__(self):
        """Validate inputs and set random defaults if needed."""
        if self.direction is not None and self.direction not in DIRECTIONS:
            raise ValueError(f"Invalid direction: '{self.direction}'. Must be one of {DIRECTIONS}")
        if self.stance is not None and self.stance not in STANCES:
            raise ValueError(f"Invalid stance: '{self.stance}'. Must be one of {STANCES}")
        if self.move is not None and self.move not in MOVES:
            raise ValueError(f"Invalid move: '{self.move}'. Must be one of {MOVES}")

        """Called after the object is created to set random defaults if needed."""
        if self.direction is None:
            self.direction = random.choice(DIRECTIONS)
            self.enter_into_trick = self.direction
            self.exit_from_trick = self.direction

        if self.move is None:
            self.move = random.choice(MOVES)
        
        # Automatically determine stance if not provided
        if self.stance is None and self.move not in exclude_stance:
            self.stance = random.choice(STANCES)

        if self.move in ["gazelle", "lion"]:
            if self.direction == "back":
                self.exit_from_trick = "front"
            elif self.direction == "front":
                self.exit_from_trick = "back"

    def __str__(self):
        parts = []
        
        display_direction = self.direction
        # Handle fakie/forward display name
        if self.move in use_fakie:
            if self.direction == "back":
                display_direction = "fakie"
            elif self.direction == "front":
                display_direction = "forward"
        
        if display_direction and display_direction != "null":
            parts.append(display_direction)
        if self.stance:
            parts.append(self.stance)
        if self.move:
            parts.append(self.move)

        return " ".join(parts)

    def to_dict(self):
        """Returns a dictionary representation of the trick, including its full name."""
        data = asdict(self)
        data['name'] = str(self)
        return data


# Generate a combination of tricks. Default setting is random, between 2-5 tricks.
def generate_combo(num_of_tricks: Optional[int] = None) -> list[str]:
    if num_of_tricks is None:
        num_of_tricks = random.randint(2, 5)

    trick_line: list[str] = []
    for _ in range(num_of_tricks):
        # Use the new class method to generate a Trick object
        trick_obj = Trick()
        trick_line.append(str(trick_obj))
    return trick_line
