import random
import json
import importlib.resources
from typing import Optional, Any
from dataclasses import dataclass, asdict
from pydantic import BaseModel, Field


# Pydantic models for data validation
class TrickRules(BaseModel):
    """Defines the structure of the 'RULES' object in tricks.json."""

    only_first: set[str] = Field(..., alias="ONLY_FIRST")
    use_fakie: set[str] = Field(..., alias="USE_FAKIE")
    rotating_moves: set[str] = Field(..., alias="ROTATING_MOVES")
    exclude_stance_base: set[str] = Field(..., alias="EXCLUDE_STANCE_BASE")


class TrickData(BaseModel):
    """Defines the top-level structure of tricks.json."""

    directions: tuple[str, ...] = Field(..., alias="DIRECTIONS")
    stances: tuple[str, ...] = Field(..., alias="STANCES")
    moves: tuple[str, ...] = Field(..., alias="MOVES")
    rules: TrickRules = Field(..., alias="RULES")


# Load trick data from JSON
def _load_trick_data() -> TrickData:
    """Loads trick definitions from the embedded tricks.json file."""
    with importlib.resources.open_text("wzrdbrain", "tricks.json") as f:
        data = json.load(f)
        return TrickData.model_validate(data)


_TRICK_DATA = _load_trick_data()

# Trick data definitions
DIRECTIONS = _TRICK_DATA.directions
STANCES = _TRICK_DATA.stances
MOVES = _TRICK_DATA.moves

# Rules
only_first = _TRICK_DATA.rules.only_first
use_fakie = _TRICK_DATA.rules.use_fakie
rotating_moves = _TRICK_DATA.rules.rotating_moves
exclude_stance = _TRICK_DATA.rules.exclude_stance_base.union(use_fakie)

# Pre-calculate the set of moves that are valid for subsequent tricks
SUBSEQUENT_MOVES = set(MOVES) - only_first


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
        if self.move in rotating_moves:
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

    for i in range(num_of_tricks):
        if i == 0:
            # First trick: choose from all moves
            move = random.choice(MOVES)
            new_trick = Trick(move=move)
        else:
            # Subsequent tricks: choose from the pre-filtered set
            assert previous_trick is not None
            required_direction = previous_trick.exit_from_trick
            move = random.choice(list(SUBSEQUENT_MOVES))  # Choose from the valid set
            new_trick = Trick(direction=required_direction, move=move)

        trick_objects.append(new_trick)
        previous_trick = new_trick

    return [trick.to_dict() for trick in trick_objects]
