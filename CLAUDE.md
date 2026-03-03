# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`wzrdbrain` is a Python library (with an auto-generated JavaScript port) that generates random wizard skating trick combinations. The main consumer app is [Rocker'd Magic Moves](https://rockerd.web.app). Published to PyPI; JS version served via JSDelivr CDN.

## Development Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Commands

```bash
# Quality checks (run in this order, as CI does)
ruff check .
black .
mypy .
pytest

# Run a single test
pytest tests/test_wzrdbrain.py::test_name -v

# Build package
python -m build

# Regenerate wzrdbrain.js from Python source (requires GEMINI_API_KEY)
python utils/translate2js.py
```

## Architecture

**Core library**: `src/wzrdbrain/wzrdbrain.py`
- Loads and validates `tricks.json` via Pydantic models (`TrickRules`, `TrickData`)
- `Trick` dataclass: holds direction, stance, move, enter/exit directions; `__post_init__` applies randomization and rules
- `generate_combo(num_of_tricks)` — links tricks so each trick's entry direction matches the previous trick's exit direction; ONLY_FIRST moves excluded after first trick
- Pre-calculates `SUBSEQUENT_MOVES` at module load for efficiency

**Data**: `src/wzrdbrain/tricks.json` — single source of truth for all moves, directions, stances, and rule sets (ONLY_FIRST, USE_FAKIE, ROTATING_MOVES, EXCLUDE_STANCE_BASE)

**JavaScript port**: `src/wzrdbrain/wzrdbrain.js` is **auto-generated** by `utils/translate2js.py` using the Gemini API. Do not hand-edit it — changes to Python logic or `tricks.json` trigger CI to regenerate it. The reference style guide for the JS output is `utils/wzrdbrain.base.js`.

**Public API**: Only `generate_combo` is exported from `src/wzrdbrain/__init__.py`.

## Key Rules / Conventions

- Line length: 100 (ruff + black)
- Strict mypy: all code must pass `mypy .` with `strict = true`
- Adding tricks: edit `tricks.json` — this is the easiest contribution and the most common one
- When tricks.json or wzrdbrain.py change, CI auto-translates and commits an updated wzrdbrain.js
- `__version__` in `__init__.py` should stay in sync with `pyproject.toml`
