# AGENTS.md

This file provides guidance to AI coding agents working with this repository.

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
- Loads and validates `moves.json` via Pydantic models (`Move`, `MoveLibrary`, `State`, `ExitState`, `Mechanics`)
- `Trick` dataclass: resolves absolute entry/exit states from a move ID; `__post_init__` applies relative state resolution (`same`/`opposite`)
- `generate_combo(num_of_tricks, max_stage)` — chains tricks using two-tier matching: strict (direction + point) preferred, relaxed (direction only) fallback. Always returns exactly N tricks.
- `MOVES` dict built at module load for O(1) move lookup by ID

**Data**: `src/wzrdbrain/moves.json` — single source of truth for all 64 move variants. Each move defines entry/exit physical states (direction, edge, stance, point), mechanics, category, and stage.

**Schema**: `src/wzrdbrain/move_schema.json` — JSON Schema defining the structure of moves.json. Categories: `base`, `turn`, `transition`, `manual`, `pivot`, `slide`, `swivel`, `air`.

**JavaScript port**: `src/wzrdbrain/wzrdbrain.js` is **auto-generated** by `utils/translate2js.py` using the Gemini API. Do not hand-edit it — changes to Python logic or `moves.json` trigger CI to regenerate it. The reference style guide for the JS output is `utils/wzrdbrain.base.js`.

**Research**: `docs/moves_research.md` — methodology, source verification, edge conventions, and design decisions.

**Public API**: Only `generate_combo` is exported from `src/wzrdbrain/__init__.py`.

## Key Rules / Conventions

- Line length: 100 (ruff + black)
- Strict mypy: all code must pass `mypy .` with `strict = true`
- Adding moves: add a new entry to `moves.json` with entry/exit states — this is the easiest contribution
- Edge convention: for two-footed moves, `edge` refers to the leading foot's edge
- When moves.json or wzrdbrain.py change, CI auto-translates and commits an updated wzrdbrain.js
- **Version bumps must update ALL files that contain the version number.** Search the entire repo for the old version string before committing. Known locations: `pyproject.toml`, `src/wzrdbrain/__init__.py`, `README.md`, and `docs/usage.md` (CDN URLs).

## Branching & Release Policy

- **Never push directly to `main`**. All changes must be made on a working branch and merged via pull request.
- **Before merging a PR**, wait for all GitHub Actions checks to pass. Do not merge (including with `--admin`) if any check is pending or failing.
- **New releases may only be created after all GitHub Actions checks have passed** on the merged PR. Do not tag or publish a release if any CI job is failing.
