from wzrdbrain.wzrdbrain import Trick, generate_combo


def test_trick_creation_and_state_resolution() -> None:
    """Test that creating a Trick resolves entry and exit states correctly."""
    # Front Gazelle (Open)
    # Entry: [front, inside, open, heel]
    # Exit (Resolved): [back, outside, open, toe]
    trick = Trick("gazelle_f_o")
    
    assert trick.move_id == "gazelle_f_o"
    assert trick.direction == "front"
    assert trick.edge == "inside"
    assert trick.stance == "open"
    assert trick.point == "heel"
    
    assert trick.exit_direction == "back"
    assert trick.exit_edge == "outside"
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
    # It might be less than 3 if no compatible moves are found, 
    # but with the current library it should be fine.
    assert len(combo) > 0
    for trick_dict in combo:
        assert isinstance(trick_dict, dict)
        assert "name" in trick_dict
        assert "id" in trick_dict


def test_generate_combo_physical_continuity() -> None:
    """Test that tricks in a combo are linked by physical states."""
    # Generate a combo and check direction and weight point continuity
    combo = generate_combo(5)
    for i in range(len(combo) - 1):
        current = combo[i]
        next_trick = combo[i + 1]
        
        # Next trick must be able to start where the current one ends
        assert current["exit"]["direction"] == next_trick["entry"]["direction"]
        assert current["exit"]["point"] == next_trick["entry"]["point"]


def test_generate_combo_stage_filtering() -> None:
    """Test that max_stage correctly filters moves."""
    # Only stage 1 moves
    combo = generate_combo(5, max_stage=1)
    for trick in combo:
        assert trick["stage"] == 1


def test_generate_combo_edge_cases() -> None:
    assert generate_combo(0) == []
    # Test with very high stage to ensure all moves are accessible
    assert len(generate_combo(1, max_stage=5)) == 1
