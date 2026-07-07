# AGENTS.md

This file provides guidance to AI coding agents working with this repository.

## Project Overview

`wzrdbrain` is a Python library that generates random wizard skating trick combinations. Consumers: [Rocker'd Magic Moves](https://rockerd.web.app) (web app) and the WizardSkatingBot Telegram bot. Published to PyPI. (A JavaScript port existed through v0.4.1 and was removed; old tags remain fetchable via JSDelivr.)

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
```

## Architecture

**Core library**: `src/wzrdbrain/wzrdbrain.py`
- Loads and validates `moves.json` via Pydantic models (`Move`, `MoveLibrary`, `State`, `ExitState`, `Mechanics`)
- `Trick` dataclass: resolves absolute entry/exit states from a move ID; `__post_init__` applies relative state resolution (`same`/`opposite`)
- `generate_combo(num_of_tricks, max_stage)` — chains tricks using a three-tier cascade: strict (direction + point + edge + stance) preferred, then mid (direction + point), then relaxed (direction only). Each emitted trick records a `transition` annotation (`start`/`linked`/`edge_shift`/`reset`) describing how continuous its link is. Returns exactly N tricks as long as a direction-compatible move exists (always true for the current library); otherwise returns the partial combo rather than dead-ending.
- `MOVES` dict built at module load for O(1) move lookup by ID

**Data**: `src/wzrdbrain/moves.json` — single source of truth for all 68 move variants. Each move defines entry/exit physical states (direction, edge, stance, point), mechanics, category, and stage.

**Schema**: `src/wzrdbrain/move_schema.json` — JSON Schema defining the structure of moves.json. Categories: `base`, `turn`, `transition`, `manual`, `pivot`, `slide`, `swivel`, `air`.

**Research**: `docs/moves_research.md` — methodology, source verification, edge conventions, and design decisions.

**Public API**: Only `generate_combo` is exported from `src/wzrdbrain/__init__.py`.

## Key Rules / Conventions

- Line length: 100 (ruff + black)
- Strict mypy: all code must pass `mypy .` with `strict = true`
- Adding moves: add a new entry to `moves.json` with entry/exit states — this is the easiest contribution
- Edge convention: for two-footed moves, `edge` refers to the leading foot's edge
- **Version bumps must update ALL files that contain the version number.** Search the entire repo for the old version string before committing. Known locations: `pyproject.toml` and `src/wzrdbrain/__init__.py`. (The JSDelivr URL in README.md is intentionally pinned to `v0.4.1`, the last release with the JS port — never bump it.)

## Branching & Release Policy

- **Never push directly to `main`**. All changes must be made on a working branch and merged via pull request.
- **Before merging a PR**, wait for all GitHub Actions checks to pass. Do not merge (including with `--admin`) if any check is pending or failing.
- **New releases may only be created after all GitHub Actions checks have passed** on the merged PR. Do not tag or publish a release if any CI job is failing.
