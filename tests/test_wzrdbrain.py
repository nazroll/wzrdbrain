import pytest
from wzrdbrain.wzrdbrain import Trick, generate_combo, DIRECTIONS, MOVES, STANCES, only_first


def test_trick_creation_with_validation() -> None:
    """Test that creating a Trick with invalid data raises a ValueError."""
    with pytest.raises(ValueError, match="Invalid move"):
        Trick(move="invalid_move")
    with pytest.raises(ValueError, match="Invalid direction"):
        Trick(direction="invalid_direction")
    with pytest.raises(ValueError, match="Invalid stance"):
        Trick(stance="invalid_stance")


def test_trick_default_creation() -> None:
    """Test creating a Trick with no arguments uses random defaults."""
    trick = Trick()
    assert isinstance(trick, Trick)
    assert trick.move in MOVES
    assert trick.direction in DIRECTIONS
    if trick.move not in {"predator", "predator one"}:
        # Stance should be None for predator moves, otherwise it should be set
        if trick.stance:
            assert trick.stance in STANCES


def test_trick_str_representation() -> None:
    """Test the string formatting of a Trick, including the 'fakie' logic."""
    trick1 = Trick(direction="front", stance="open", move="gazelle")
    assert str(trick1) == "front open gazelle"

    trick2 = Trick(direction="back", move="360")
    assert str(trick2) == "fakie 360"

    trick3 = Trick(direction="front", move="soul slide")
    assert str(trick3) == "forward soul slide"


def test_trick_to_dict() -> None:
    """Test the to_dict method includes the 'name' key."""
    trick = Trick(direction="front", stance="open", move="gazelle")
    trick_dict = trick.to_dict()
    assert isinstance(trick_dict, dict)
    assert "name" in trick_dict
    assert trick_dict["name"] == "front open gazelle"
    assert trick_dict["move"] == "gazelle"


def test_generate_combo_returns_list_of_dicts() -> None:
    """Test that generate_combo returns a list of trick dictionaries."""
    combo = generate_combo(3)
    assert isinstance(combo, list)
    assert len(combo) == 3
    for trick_dict in combo:
        assert isinstance(trick_dict, dict)
        assert "name" in trick_dict
        assert "move" in trick_dict


def test_generate_combo_linking() -> None:
    """Test that tricks in a combo are linked by their exit/enter directions."""
    # Generate a long combo to increase the chance of seeing rotation
    combo = generate_combo(10)
    for i in range(len(combo) - 1):
        current_trick = combo[i]
        next_trick = combo[i + 1]
        assert current_trick["exit_from_trick"] == next_trick["enter_into_trick"]


def test_generate_combo_only_first_rule() -> None:
    """Test that moves in 'only_first' do not appear after the first trick."""
    # Run multiple times to ensure rule is consistently applied
    for _ in range(10):
        combo = generate_combo(5)
        # Check all tricks after the first one
        for trick_dict in combo[1:]:
            assert trick_dict["move"] not in only_first
