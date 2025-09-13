import random
import json
import importlib.resources
from typing import Optional, Any
from dataclasses import dataclass, asdict

# Load trick data from JSON
def _load_trick_data():
    """Loads trick definitions from the embedded tricks.json file."""
    with importlib.resources.open_text("wzrdbrain", "tricks.json") as f:
        return json.load(f)
    
_TRICK_DATA = _load_trick_data()

# Trick data definitions loaded from JSON
DIRECTIONS = tuple(_TRICK_DATA["DIRECTIONS"])
STANCES = tuple(_TRICK_DATA["STANCES"])
MOVES = tuple(_TRICK_DATA["MOVES"])

# Rules loaded from JSON
_RULES = _TRICK_DATA["RULES"]
only_first = set(_RULES["ONLY_FIRST"])
use_fakie = set(_RULES["USE_FAKIE"])
rotating_moves = set(_RULES["ROTATING_MOVES"])

# Moves that don't have an open/closed stance are derived from the JSON data
exclude_stance = set(_RULES["EXCLUDE_STANCE_BASE"]).union(use_fakie)

@dataclass
class Trick:
    direction: Optional[str] = None
    stance: Optional[str] = None
    move: Optional[str] = None
    enter_into_trick: Optional[str] = None
    exit_from_trick: Optional[str] = None

    def __post_init__(self) -> None:
        """
        Validate inputs and set random defaults for any attributes that were not provided.
        """
        # Input validation
        if self.direction is not None and self.direction not in DIRECTIONS:
            raise ValueError(f"Invalid direction: '{self.direction}'. Must be one of {DIRECTIONS}")
        if self.stance is not None and self.stance not in STANCES:
            raise ValueError(f"Invalid stance: '{self.stance}'. Must be one of {STANCES}")
        if self.move is not None and self.move not in MOVES:
            raise ValueError(f"Invalid move: '{self.move}'. Must be one of {MOVES}")

        # Generate default values
        if self.direction is None:
            self.direction = random.choice(DIRECTIONS)

        if self.move is None:
            self.move = random.choice(MOVES)

        if self.enter_into_trick is None:
            self.enter_into_trick = self.direction

        if self.exit_from_trick is None:
            self.exit_from_trick = self.direction

        # Automatically determine stance if not provided
        if self.stance is None and self.move not in exclude_stance:
            self.stance = random.choice(STANCES)

        # Update exit direction for moves that rotate the body
        if self.move in ["gazelle", "lion", "180", "540"]:
            if self.direction == "back":
                self.exit_from_trick = "front"
            elif self.direction == "front":
                self.exit_from_trick = "back"

    def __str__(self) -> str:
        parts = []
        display_direction = self.direction
        # Handle fakie/forward display name
        if self.move in use_fakie:
            if self.direction == "back":
                display_direction = "fakie"
            elif self.direction == "front":
                display_direction = "forward"

        if display_direction:
            parts.append(display_direction)
        if self.stance:
            parts.append(self.stance)
        if self.move:
            parts.append(self.move)

        return " ".join(parts)

    def to_dict(self) -> dict[str, Any]:
        """Returns a dictionary representation of the trick, including its full name."""
        data = asdict(self)
        data["name"] = str(self)
        return data


# Generate a combination of tricks. Default is a random number from 2 until 5.
def generate_combo(num_of_tricks: Optional[int] = None) -> list[dict[str, Any]]:
    if num_of_tricks is None:
        num_of_tricks = random.randint(2, 5)

    if num_of_tricks <= 0:
        return []

    trick_objects: list[Trick] = []
    previous_trick: Optional[Trick] = None

    for _ in range(num_of_tricks):
        if previous_trick is None:
            # Generate the first trick without constraints
            new_trick = Trick()
        else:
            # Generate subsequent tricks based on the previous one's exit
            required_direction = previous_trick.exit_from_trick
            # Loop until we generate a valid trick for this position
            while True:
                candidate_trick = Trick(direction=required_direction)
                if candidate_trick.move not in only_first:
                    new_trick = candidate_trick
                    break

        trick_objects.append(new_trick)
        previous_trick = new_trick

    # Convert all trick objects to dictionaries for the final output
    return [trick.to_dict() for trick in trick_objects]
