import random
import json
import importlib.resources
from typing import Optional, Any
from dataclasses import dataclass, field
from pydantic import BaseModel, Field


# Pydantic models for the new state-transition schema
class Mechanics(BaseModel):
    feet: int
    is_rotation: bool
    degrees: int
    rotation_type: str


class State(BaseModel):
    direction: str
    edge: str
    stance: str
    point: str


class ExitState(BaseModel):
    direction: str
    edge: str
    stance: str
    point: str
    lead_foot: str
    feet: int


class Metadata(BaseModel):
    is_fakie_variant: Optional[bool] = False
    description: Optional[str] = None
    aka: Optional[list[str]] = []


class Move(BaseModel):
    id: str
    name: str
    category: str
    stage: int
    mechanics: Mechanics
    entry: State
    exit: ExitState
    metadata: Metadata = Field(default_factory=Metadata)


class MoveLibrary(BaseModel):
    version: str
    moves: list[Move]


# Load move library from JSON
def _load_move_library() -> MoveLibrary:
    """Loads move definitions from the embedded moves.json file."""
    with importlib.resources.open_text("wzrdbrain", "moves.json") as f:
        data = json.load(f)
        return MoveLibrary.model_validate(data)


_LIBRARY = _load_move_library()
MOVES = {move.id: move for move in _LIBRARY.moves}


@dataclass
class Trick:
    move_id: str
    # Resolved states
    direction: str = field(init=False)
    edge: str = field(init=False)
    stance: str = field(init=False)
    point: str = field(init=False)
    exit_direction: str = field(init=False)
    exit_edge: str = field(init=False)
    exit_stance: str = field(init=False)
    exit_point: str = field(init=False)

    def __post_init__(self) -> None:
        move = MOVES[self.move_id]
        # Entry states are absolute in the library for now
        self.direction = move.entry.direction
        self.edge = move.entry.edge
        self.stance = move.entry.stance
        self.point = move.entry.point

        # Resolve Exit States
        self.exit_direction = self._resolve_relative(move.exit.direction, self.direction)
        self.exit_edge = self._resolve_relative(move.exit.edge, self.edge)
        self.exit_stance = self._resolve_relative(move.exit.stance, self.stance)
        self.exit_point = move.exit.point  # Point is always absolute

    def _resolve_relative(self, value: str, base: str) -> str:
        if value == "same":
            return base
        if value == "opposite":
            opposites = {
                "front": "back",
                "back": "front",
                "inside": "outside",
                "outside": "inside",
                "open": "closed",
                "closed": "open",
            }
            return opposites.get(base, base)
        return value

    def __str__(self) -> str:
        return MOVES[self.move_id].name

    def to_dict(self) -> dict[str, Any]:
        move = MOVES[self.move_id]
        return {
            "id": self.move_id,
            "name": move.name,
            "category": move.category,
            "stage": move.stage,
            "entry": {
                "direction": self.direction,
                "edge": self.edge,
                "stance": self.stance,
                "point": self.point,
            },
            "exit": {
                "direction": self.exit_direction,
                "edge": self.exit_edge,
                "stance": self.exit_stance,
                "point": self.exit_point,
            },
        }


def _apply_realism_filters(candidates: list[Move], combo: list[Trick]) -> list[Move]:
    """
    Applies realism constraints to candidate moves.
    Returns empty list if category diversity cannot be satisfied,
    signalling the caller to try a wider candidate pool.
    """
    if not combo:
        return candidates

    last_move = MOVES[combo[-1].move_id]
    filtered = candidates

    # Constraint 1 (highest priority): Max 2 consecutive same category
    # Returns empty if unsatisfiable so the caller widens the pool.
    if len(combo) >= 2:
        prev_category = MOVES[combo[-2].move_id].category
        if prev_category == last_move.category:
            no_cat = [m for m in filtered if m.category != last_move.category]
            if not no_cat:
                return []
            filtered = no_cat

    # Constraint 2: No consecutive same move
    no_dup = [m for m in filtered if m.id != last_move.id]
    if no_dup:
        filtered = no_dup

    # Constraint 3: No consecutive high-rotation (degrees >= 360)
    if last_move.mechanics.degrees >= 360:
        no_spin = [m for m in filtered if m.mechanics.degrees < 360]
        if no_spin:
            filtered = no_spin

    return filtered


def generate_combo(num_of_tricks: Optional[int] = None, max_stage: int = 5) -> list[dict[str, Any]]:
    """
    Generates a combination of tricks based on physical state transitions.
    """
    if num_of_tricks is None:
        num_of_tricks = random.randint(2, 5)

    if num_of_tricks <= 0:
        return []

    combo: list[Trick] = []

    # 1. Select the first trick (usually a Stage 1 move or random)
    valid_start_moves = [m for m in _LIBRARY.moves if m.stage <= max_stage]
    first_move = random.choice(valid_start_moves)
    current_trick = Trick(first_move.id)
    combo.append(current_trick)

    # 2. Iteratively find compatible moves using two-tier matching
    for _ in range(num_of_tricks - 1):
        eligible = [m for m in _LIBRARY.moves if m.stage <= max_stage]

        # Tier 1 — strict: direction + point must both match the current exit state
        strict = [
            m
            for m in eligible
            if m.entry.direction == current_trick.exit_direction
            and m.entry.point == current_trick.exit_point
        ]

        # Tier 2 — relaxed: direction only (implicit edge/point shift between tricks)
        relaxed = [m for m in eligible if m.entry.direction == current_trick.exit_direction]

        # Apply realism constraints to strict pool first, widen to relaxed if needed
        strict_filtered = _apply_realism_filters(strict, combo) if strict else []
        relaxed_filtered = _apply_realism_filters(relaxed, combo)

        if strict_filtered:
            candidates = strict_filtered
        elif relaxed_filtered:
            candidates = relaxed_filtered
        else:
            candidates = relaxed

        next_move = random.choice(candidates)
        current_trick = Trick(next_move.id)
        combo.append(current_trick)

    return [t.to_dict() for t in combo]
