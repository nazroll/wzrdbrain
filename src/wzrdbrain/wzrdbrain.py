import random
import json
import importlib.resources
from typing import Optional, Any, Literal
from dataclasses import dataclass, field
from pydantic import BaseModel, Field

# Enums mirroring move_schema.json. Entry states are absolute; exit states may
# also be the relative tokens "same"/"opposite", resolved against the entry.
EntryDirection = Literal["front", "back"]
ExitDirection = Literal["same", "opposite", "front", "back"]
EntryEdge = Literal["inside", "outside", "center"]
ExitEdge = Literal["same", "opposite", "inside", "outside", "center"]
EntryStance = Literal["open", "closed", "neutral"]
ExitStance = Literal["same", "opposite", "open", "closed", "neutral"]
Point = Literal["toe", "heel", "all", "none"]
LeadFoot = Literal["same", "opposite"]
Category = Literal["base", "turn", "transition", "manual", "pivot", "slide", "swivel", "air"]
RotationType = Literal["natural", "switch", "neutral"]


# Pydantic models for the new state-transition schema
class Mechanics(BaseModel):
    feet: int
    is_rotation: bool
    degrees: int
    rotation_type: RotationType


class State(BaseModel):
    direction: EntryDirection
    edge: EntryEdge
    stance: EntryStance
    point: Point


class ExitState(BaseModel):
    direction: ExitDirection
    edge: ExitEdge
    stance: ExitStance
    point: Point
    lead_foot: LeadFoot
    feet: int


class Metadata(BaseModel):
    is_fakie_variant: Optional[bool] = False
    description: Optional[str] = None
    aka: Optional[list[str]] = []


class Move(BaseModel):
    id: str
    name: str
    category: Category
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
    exit_lead_foot: str = field(init=False)
    exit_feet: int = field(init=False)

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
        # lead_foot is a relative token (same/opposite) telling the skater whether the
        # guiding foot switches; feet (1 or 2) is absolute. Both are surfaced in to_dict.
        self.exit_lead_foot = move.exit.lead_foot
        self.exit_feet = move.exit.feet

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

    def to_dict(self, transition: str = "start") -> dict[str, Any]:
        move = MOVES[self.move_id]
        return {
            "id": self.move_id,
            "name": move.name,
            "category": move.category,
            "stage": move.stage,
            # How this trick links to the previous one. "start" for the first trick;
            # otherwise describes how much implicit body adjustment the link required
            # (see _transition_type).
            "transition": transition,
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
                "lead_foot": self.exit_lead_foot,
                "feet": self.exit_feet,
            },
        }


def _apply_realism_filters(
    candidates: list[Move], combo: list[Trick], hard_category: bool = True
) -> list[Move]:
    """
    Applies realism constraints to candidate moves.
    If hard_category is True and category diversity cannot be satisfied,
    returns empty list signalling the caller to try a wider candidate pool.
    If hard_category is False, applies other constraints even if category repeats.
    """
    if not candidates or not combo:
        return candidates

    last_move = MOVES[combo[-1].move_id]
    filtered = candidates

    # Constraint 1: Max 2 consecutive same category (general)
    if len(combo) >= 2:
        prev_category = MOVES[combo[-2].move_id].category
        if prev_category == last_move.category and last_move.category != "slide":
            no_cat = [m for m in filtered if m.category != last_move.category]
            if not no_cat and hard_category:
                return []
            if no_cat:
                filtered = no_cat

    # Constraint 1b: Specific slide probability
    if last_move.category == "slide":
        # Hard cap at 2 slides (absolute, ignores hard_category flag)
        if len(combo) >= 2 and MOVES[combo[-2].move_id].category == "slide":
            no_slide = [m for m in filtered if m.category != "slide"]
            if not no_slide:  # Absolute hard cap, never soft-fallback back into slides
                return []
            filtered = no_slide
        else:
            # 10% chance to allow consecutive slides if we haven't hit the cap
            # If random check fails, we try to force a non-slide
            if random.random() > 0.10:
                no_slide = [m for m in filtered if m.category != "slide"]
                if not no_slide and hard_category:
                    return []
                if no_slide:
                    filtered = no_slide

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


def _transition_type(prev: Trick, nxt: Move) -> str:
    """
    Classifies how physically continuous the link from ``prev`` (exit state) into
    ``nxt`` (entry requirements) is. The generator always preserves direction, so
    direction is assumed to match here. Returns, from most to least continuous:

    - "linked":     edge, stance and point all carry over — no body reset needed.
    - "edge_shift": point carries over but the skater re-sets an edge/stance.
    - "reset":      direction only — the skater re-distributes weight (point) and edge.
    """
    edge_ok = nxt.entry.edge == prev.exit_edge
    stance_ok = nxt.entry.stance == prev.exit_stance
    point_ok = nxt.entry.point == prev.exit_point

    if edge_ok and stance_ok and point_ok:
        return "linked"
    if point_ok:
        return "edge_shift"
    return "reset"


def generate_combo(num_of_tricks: Optional[int] = None, max_stage: int = 5) -> list[dict[str, Any]]:
    """
    Generates a combination of tricks based on physical state transitions.

    Candidate selection uses a three-tier cascade so that each link prefers full
    physical continuity but never dead-ends:

      Tier 1 (strict):  entry direction + point + edge + stance all match the exit state
      Tier 2 (mid):     entry direction + point match (edge/stance re-set between tricks)
      Tier 3 (relaxed): entry direction matches (weight point also re-set)

    Each emitted trick records which kind of link it required via the ``transition``
    field (see _transition_type), so the output never silently contradicts itself.
    """
    if num_of_tricks is None:
        num_of_tricks = random.randint(2, 5)

    if num_of_tricks <= 0:
        return []

    combo: list[Trick] = []
    transitions: list[str] = ["start"]

    # 1. Select the first trick uniformly from all moves within max_stage
    valid_start_moves = [m for m in _LIBRARY.moves if m.stage <= max_stage]
    if not valid_start_moves:
        return []
    first_move = random.choice(valid_start_moves)
    current_trick = Trick(first_move.id)
    combo.append(current_trick)

    # 2. Iteratively find compatible moves using the three-tier cascade
    for _ in range(num_of_tricks - 1):
        eligible = [m for m in _LIBRARY.moves if m.stage <= max_stage]

        # All tiers preserve direction (the one hard physical invariant).
        same_direction = [m for m in eligible if m.entry.direction == current_trick.exit_direction]

        # Tier 1 — strict: direction + point + edge + stance all match the exit state.
        strict = [
            m
            for m in same_direction
            if m.entry.point == current_trick.exit_point
            and m.entry.edge == current_trick.exit_edge
            and m.entry.stance == current_trick.exit_stance
        ]

        # Tier 2 — mid: direction + point match (edge/stance re-set between tricks).
        mid = [m for m in same_direction if m.entry.point == current_trick.exit_point]

        # Tier 3 — relaxed: direction only (weight point also re-set).
        relaxed = same_direction

        # Apply realism constraints to the narrowest pool first, widening as needed.
        # A tier is only accepted if it offers a move other than an immediate repeat;
        # otherwise we widen so a single same-move survivor never forces a duplicate.
        last_id = current_trick.move_id
        candidates = []
        for pool in (strict, mid, relaxed):
            filtered = _apply_realism_filters(pool, combo, hard_category=True) if pool else []
            non_dup = [m for m in filtered if m.id != last_id]
            if non_dup:
                candidates = non_dup
                break
        else:
            # Every hard-category pool came up empty; relax the category constraint.
            filtered = _apply_realism_filters(relaxed, combo, hard_category=False)
            candidates = [m for m in filtered if m.id != last_id] or filtered

        if not candidates:
            # Absolute worst-case fallback, should rarely be hit given the library size.
            # Prefer a non-repeat, but keep the 2-slide hard cap absolute even here.
            candidates = [m for m in relaxed if m.id != last_id] or relaxed
            if (
                len(combo) >= 2
                and MOVES[combo[-1].move_id].category == "slide"
                and MOVES[combo[-2].move_id].category == "slide"
            ):
                candidates = [m for m in candidates if m.category != "slide"]

        if not candidates:
            # No physically valid continuation exists; return the partial combo
            break

        next_move = random.choice(candidates)
        transitions.append(_transition_type(current_trick, next_move))
        current_trick = Trick(next_move.id)
        combo.append(current_trick)

    return [t.to_dict(transition) for t, transition in zip(combo, transitions)]
