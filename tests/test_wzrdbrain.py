from pathlib import Path
import sys
import pytest

# Ensure src is on path so we can import the module under test
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
sys.path.insert(0, str(SRC))

import wzrdbrain.wzrdbrain as wb


def test_generate_trick_exclude_stance(monkeypatch):
    # Force choices so selected_move is in exclude_stance ('predator')
    def fake_choice(seq):
        if seq is wb.move:
            return "predator"
        if seq is wb.direction:
            return "front"
        if seq is wb.stance:
            return "open"
        raise RuntimeError("unexpected seq")

    monkeypatch.setattr(wb.random, "choice", fake_choice)
    trick = wb.generate_trick()
    assert trick == ["front", "predator"]


def test_generate_trick_with_stance(monkeypatch):
    # Force choices so selected_move is NOT in exclude_stance ('parallel')
    def fake_choice(seq):
        if seq is wb.move:
            return "parallel"
        if seq is wb.direction:
            return "back"
        if seq is wb.stance:
            return "open"
        raise RuntimeError("unexpected seq")

    monkeypatch.setattr(wb.random, "choice", fake_choice)
    trick = wb.generate_trick()
    assert trick == ["back", "open", "parallel"]


def test_generate_combo_fakie_conversion(monkeypatch):
    # Provide deterministic successive generate_trick outputs to test fakie/forward conversion
    seq = iter(
        [
            ["front", "parallel"],    # not in use_fakie -> unchanged
            ["back", "toe press"],    # in use_fakie -> back -> fakie (since it's subsequent)
            ["front", "360"],         # in use_fakie -> front -> forward
        ]
    )

    def fake_generate_trick():
        return next(seq)

    monkeypatch.setattr(wb, "generate_trick", fake_generate_trick)

    line = wb.generate_combo(3)
    assert line == [
        "front parallel",
        "fakie toe press",
        "forward 360",
    ]


def test_generate_combo_default_length():
    # Default should produce between 1 and 5 tricks
    line = wb.generate_combo()
    assert 1 <= len(line) <= 5
    for item in line:
        assert isinstance(item, str)