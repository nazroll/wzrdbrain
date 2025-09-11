from pathlib import Path
import sys
from collections.abc import Iterator, Sequence

import pytest
from wzrdbrain import Trick, generate_combo
from wzrdbrain.wzrdbrain import DIRECTIONS, MOVES, STANCES, only_first

# Ensure src is on path so we can import the module under test
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
sys.path.insert(0, str(SRC))

import wzrdbrain.wzrdbrain as wb  # noqa: E402


def test_generate_trick_exclude_stance(monkeypatch: pytest.MonkeyPatch) -> None:
    # Force choices so selected_move is in exclude_stance ('predator')
    def fake_choice(seq: Sequence[str]) -> str:
        if seq is wb.move:
            return "predator"
        if seq is wb.direction:
            return "front"
        if seq is wb.stance:
            return "open"
        raise RuntimeError("unexpected seq")

    # patch the module-level random.choice by target string to avoid mypy attr warnings
    monkeypatch.setattr("wzrdbrain.wzrdbrain.random.choice", fake_choice)
    trick = wb.generate_trick()
    assert trick == ["front", "predator"]


def test_generate_trick_with_stance(monkeypatch: pytest.MonkeyPatch) -> None:
    # Force choices so selected_move is NOT in exclude_stance ('parallel')
    def fake_choice(seq: Sequence[str]) -> str:
        if seq is wb.move:
            return "parallel"
        if seq is wb.direction:
            return "back"
        if seq is wb.stance:
            return "open"
        raise RuntimeError("unexpected seq")

    monkeypatch.setattr("wzrdbrain.wzrdbrain.random.choice", fake_choice)
    trick = wb.generate_trick()
    assert trick == ["back", "open", "parallel"]


def test_generate_combo_fakie_conversion(monkeypatch: pytest.MonkeyPatch) -> None:
    # Provide deterministic successive generate_trick outputs to test fakie/forward conversion
    seq: Iterator[list[str]] = iter(
        [
            ["front", "parallel"],  # not in use_fakie -> unchanged
            ["back", "toe press"],  # in use_fakie -> back -> fakie (since it's subsequent)
            ["front", "360"],  # in use_fakie -> front -> forward
        ]
    )

    def fake_generate_trick() -> list[str]:
        return next(seq)

    monkeypatch.setattr(wb, "generate_trick", fake_generate_trick)
    line = wb.generate_combo(3)
    assert line == [
        "front parallel",
        "fakie toe press",
        "forward 360",
    ]


def test_generate_combo_default_length() -> None:
    # Default should produce between 1 and 5 tricks
    line = wb.generate_combo()
    assert 1 <= len(line) <= 5
    for item in line:
        assert isinstance(item, str)


def test_generate_combo_empty_trick(monkeypatch: pytest.MonkeyPatch) -> None:
    # If generate_trick() returns an empty list, the combo should be empty.
    def fake_generate_trick() -> list[str]:
        return []

    monkeypatch.setattr(wb, "generate_trick", fake_generate_trick)
    line = wb.generate_combo(1)
    assert line == [""]


def test_generated_values_are_valid() -> None:
    # Run the generator a bunch of times and check that the values are valid.
    for _ in range(100):
        trick = wb.generate_trick()
        assert 2 <= len(trick) <= 3
        assert trick[0] in wb.direction
        assert trick[-1] in wb.move

        if len(trick) == 3:
            assert trick[1] in wb.stance


def test_trick_creation_with_validation():
    """Test that creating a Trick with invalid data raises a ValueError."""
    with pytest.raises(ValueError, match="Invalid move"):
        Trick(move="invalid_move")
    with pytest.raises(ValueError, match="Invalid direction"):
        Trick(direction="invalid_direction")
    with pytest.raises(ValueError, match="Invalid stance"):
        Trick(stance="invalid_stance")


def test_trick_generate():
    """Test the Trick.generate() class method."""
    trick = Trick.generate()
    assert isinstance(trick, Trick)
    assert trick.move in MOVES
    assert trick.direction in DIRECTIONS
    if trick.stance:
        assert trick.stance in STANCES


def test_trick_generate_with_specific_move():
    """Test generating a trick with a specific move."""
    trick = Trick.generate(move="gazelle")
    assert trick.move == "gazelle"
    assert trick.direction in DIRECTIONS


def test_trick_to_dict():
    """Test the to_dict method includes the 'name' key."""
    trick = Trick(direction="front", stance="open", move="gazelle")
    trick_dict = trick.to_dict()
    assert isinstance(trick_dict, dict)
    assert "name" in trick_dict
    assert trick_dict["name"] == "front open gazelle"
    assert trick_dict["move"] == "gazelle"


def test_generate_combo_returns_list_of_dicts():
    """Test that generate_combo returns a list of trick dictionaries."""
    combo = generate_combo(3)
    assert isinstance(combo, list)
    assert len(combo) == 3
    for trick_dict in combo:
        assert isinstance(trick_dict, dict)
        assert "name" in trick_dict
        assert "move" in trick_dict


def test_generate_combo_linking(monkeypatch):
    """Test that tricks in a combo are linked by their exit/enter directions."""
    # Mock random choices to make the test deterministic
    monkeypatch.setattr("random.choice", lambda x: x[0])  # Always pick the first item

    combo = generate_combo(3)
    assert len(combo) == 3

    # The first trick's exit should determine the second trick's entry
    # With our mock, direction is "front" and move is "predator" (no rotation)
    # So exit_from_trick will be "front"
    assert combo[0]["exit_from_trick"] == "front"
    assert combo[1]["enter_into_trick"] == "front"

    # Test a move that forces rotation
    # Mock generate() to return a specific first trick
    def mock_generate(direction=None):
        if direction:
            return Trick(direction=direction, move="180")  # 180 rotates
        return Trick(move="180")

    monkeypatch.setattr(Trick, "generate", mock_generate)
    combo_rotated = generate_combo(2)

    # First trick is front 180, which exits to the back
    assert combo_rotated[0]["exit_from_trick"] == "back"
    # Second trick must therefore start with "back"
    assert combo_rotated[1]["enter_into_trick"] == "back"


def test_generate_combo_only_first_rule():
    """Test that moves in 'only_first' do not appear after the first trick."""
    combo = generate_combo(5)
    # Check all tricks after the first one
    for trick_dict in combo[1:]:
        assert trick_dict["move"] not in only_first
