import pytest

from wzrdbrain.wzrdbrain import Trick, generate_combo, MOVES, _LIBRARY


# --- Existing tests (updated for corrected data) ---


def test_trick_creation_and_state_resolution() -> None:
    """Test that creating a Trick resolves entry and exit states correctly."""
    # Front Gazelle (Open): entry on OUTSIDE edge (leading-foot convention)
    trick = Trick("gazelle_f_o")

    assert trick.move_id == "gazelle_f_o"
    assert trick.direction == "front"
    assert trick.edge == "outside"
    assert trick.stance == "open"
    assert trick.point == "heel"

    assert trick.exit_direction == "back"
    assert trick.exit_edge == "inside"
    assert trick.exit_stance == "open"
    assert trick.exit_point == "toe"


def test_trick_str_representation() -> None:
    """Test the string formatting of a Trick."""
    trick = Trick("gazelle_f_o")
    assert str(trick) == "Front Gazelle (Open)"


def test_trick_to_dict() -> None:
    """Test the to_dict method includes entry and exit states."""
    trick = Trick("gazelle_f_o")
    trick_dict = trick.to_dict()
    assert isinstance(trick_dict, dict)
    assert trick_dict["name"] == "Front Gazelle (Open)"
    assert "entry" in trick_dict
    assert "exit" in trick_dict
    assert trick_dict["entry"]["direction"] == "front"
    assert trick_dict["exit"]["direction"] == "back"


def test_generate_combo_returns_list_of_dicts() -> None:
    """Test that generate_combo returns a list of trick dictionaries."""
    combo = generate_combo(3)
    assert isinstance(combo, list)
    assert len(combo) == 3
    for trick_dict in combo:
        assert isinstance(trick_dict, dict)
        assert "name" in trick_dict
        assert "id" in trick_dict


def test_generate_combo_physical_continuity() -> None:
    """Test that tricks in a combo are linked by direction continuity."""
    for _ in range(20):
        combo = generate_combo(5)
        for i in range(len(combo) - 1):
            current = combo[i]
            next_trick = combo[i + 1]
            # Direction must always be continuous
            assert current["exit"]["direction"] == next_trick["entry"]["direction"]


def test_generate_combo_stage_filtering() -> None:
    """Test that max_stage correctly filters moves."""
    combo = generate_combo(5, max_stage=1)
    for trick in combo:
        assert trick["stage"] == 1


def test_generate_combo_edge_cases() -> None:
    assert generate_combo(0) == []
    assert len(generate_combo(1, max_stage=5)) == 1


# --- New tests ---


def test_invalid_move_id() -> None:
    """Trick with a nonexistent ID raises KeyError."""
    with pytest.raises(KeyError):
        Trick("nonexistent_move")


def test_combo_always_returns_requested_count() -> None:
    """generate_combo(N) must always return exactly N tricks (no dead-ends)."""
    for n in range(2, 6):
        for _ in range(20):
            combo = generate_combo(n)
            assert len(combo) == n, f"Expected {n} tricks, got {len(combo)}"


def test_stage_1_moves_are_base_only() -> None:
    """All stage-1 moves must have category 'base'."""
    for move in _LIBRARY.moves:
        if move.stage == 1:
            assert move.category == "base", f"{move.id} is stage 1 but category {move.category}"


def test_rotating_moves_flip_direction() -> None:
    """Moves with is_rotation=True and degrees=180/540 should exit in the opposite direction."""
    rotating_ids = [
        "gazelle_f_o",
        "gazelle_b_o",
        "lion_f_o",
        "lion_b_c",
        "spin_180_f",
        "spin_180_b",
        "spin_540_f",
        "spin_540_b",
        "stunami_f",
        "stunami_b",
    ]
    opposites = {"front": "back", "back": "front"}
    for move_id in rotating_ids:
        trick = Trick(move_id)
        expected = opposites[trick.direction]
        assert (
            trick.exit_direction == expected
        ), f"{move_id}: expected exit_direction={expected}, got {trick.exit_direction}"


def test_non_rotating_moves_keep_direction() -> None:
    """Non-rotating moves (predator, tree, presses, rolls) exit in the same direction."""
    non_rotating_ids = [
        "predator_f_o",
        "predator_b_o",
        "predator_one_f",
        "predator_one_b",
        "tree_turn_o",
        "tree_turn_c",
        "toe_press_f",
        "heel_press_b",
        "toe_roll_f",
        "heel_roll_b",
    ]
    for move_id in non_rotating_ids:
        trick = Trick(move_id)
        assert (
            trick.exit_direction == trick.direction
        ), f"{move_id}: expected same direction, got {trick.exit_direction}"


def test_360_moves_return_to_same_direction() -> None:
    """360-degree rotations should exit in the same direction they entered."""
    for move_id in ["spin_360_f", "spin_360_b", "ufo_swivel_f", "ufo_swivel_b"]:
        trick = Trick(move_id)
        assert (
            trick.exit_direction == trick.direction
        ), f"{move_id}: 360 should return to same direction"


def test_pivot_stance_variants_exist() -> None:
    """All 8 pivot variants (direction x stance x type) should be in the library."""
    expected = [
        "toe_pivot_f_o",
        "toe_pivot_f_c",
        "toe_pivot_b_o",
        "toe_pivot_b_c",
        "heel_pivot_f_o",
        "heel_pivot_f_c",
        "heel_pivot_b_o",
        "heel_pivot_b_c",
    ]
    for pivot_id in expected:
        assert pivot_id in MOVES, f"Missing pivot variant: {pivot_id}"
        assert MOVES[pivot_id].category == "pivot"


def test_resolve_relative_center_neutral() -> None:
    """'opposite' of center/neutral should return center/neutral (no opposite defined)."""
    trick = Trick("predator_f_o")
    assert trick._resolve_relative("opposite", "center") == "center"
    assert trick._resolve_relative("opposite", "neutral") == "neutral"


def test_all_moves_in_library_are_valid() -> None:
    """Every move in moves.json should pass basic validation checks."""
    valid_directions = {"front", "back"}
    valid_edges = {"inside", "outside", "center"}
    valid_stances = {"open", "closed", "neutral"}
    valid_points = {"toe", "heel", "all", "none"}
    valid_categories = {"base", "turn", "transition", "manual", "pivot", "slide", "swivel", "air"}

    seen_ids: set[str] = set()
    for move in _LIBRARY.moves:
        # Unique IDs
        assert move.id not in seen_ids, f"Duplicate move ID: {move.id}"
        seen_ids.add(move.id)

        # Valid enums
        assert move.category in valid_categories, f"{move.id}: bad category {move.category}"
        assert move.entry.direction in valid_directions, f"{move.id}: bad entry direction"
        assert move.entry.edge in valid_edges, f"{move.id}: bad entry edge"
        assert move.entry.stance in valid_stances, f"{move.id}: bad entry stance"
        assert move.entry.point in valid_points, f"{move.id}: bad entry point"
        assert 1 <= move.stage <= 5, f"{move.id}: bad stage {move.stage}"


def test_combo_variety() -> None:
    """100 combos should produce more than 1 unique first move."""
    first_moves = {generate_combo(3)[0]["id"] for _ in range(100)}
    assert len(first_moves) > 1, f"All 100 combos started with the same move: {first_moves}"


def test_swivel_category_exists() -> None:
    """Stunami and UFO Swivel should have category 'swivel'."""
    assert MOVES["stunami_f"].category == "swivel"
    assert MOVES["stunami_b"].category == "swivel"
    assert MOVES["ufo_swivel_f"].category == "swivel"
    assert MOVES["ufo_swivel_b"].category == "swivel"


def test_gazelle_entry_edge_is_outside() -> None:
    """Gazelles (two-footed) should enter on outside edge (leading-foot convention)."""
    for move_id in ["gazelle_f_o", "gazelle_b_o", "gazelle_s_f_o", "gazelle_s_b_o"]:
        assert (
            MOVES[move_id].entry.edge == "outside"
        ), f"{move_id}: gazelle should enter on outside edge"


def test_lion_entry_edge_is_inside() -> None:
    """Lions (one-footed) in open stance should enter on inside edge."""
    for move_id in ["lion_f_o", "lion_b_o", "lion_s_f_o", "lion_s_b_o"]:
        assert (
            MOVES[move_id].entry.edge == "inside"
        ), f"{move_id}: lion (open) should enter on inside edge"


def test_move_count_covers_old_library() -> None:
    """The new library should have at least as many base move types as the old tricks.json."""
    # Old library had 26 moves (without direction/stance variants)
    # New library enumerates all variants explicitly, so it should be larger
    assert len(_LIBRARY.moves) >= 26, f"Expected at least 26 moves, got {len(_LIBRARY.moves)}"
