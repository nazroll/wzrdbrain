# wzrdbrain

Basic APIs to generate tricks for wizard skating.

## Installation

```bash
pip install wzrdbrain
```

## Usage

```python
from wzrdbrain import generate_trick, generate_tricks, categories

print(categories())  # ['basics', 'combos', 'grinds', 'manuals', 'spins']

# Single trick (random)
print(generate_trick())  # e.g., "Moon Carve"

# Single trick from a category
print(generate_trick(category="spins"))  # e.g., "Comet Spin"

# Deterministic (reproducible) trick
print(generate_trick(seed=123))  # always the same result for this seed

# Multiple tricks
print(generate_tricks(5))  # list of 5 tricks (duplicates allowed)

# Multiple tricks from selected categories, no duplicates
print(generate_tricks(5, categories=["basics", "spins"], unique=True))
```

## Development

```bash
# clone your repo
python -m venv .venv
source .venv/bin/activate  # on Windows: .venv\Scripts\activate
pip install -e ".[dev]"

# lint + format
ruff check .
black .

# type-check
mypy .

# tests
pytest
```

## Release

1. Update version in `pyproject.toml` and `src/wzrdbrain/__init__.py`.
2. Create a Git tag and GitHub Release, e.g. `v0.1.0`.
3. The release workflow will build and publish to PyPI via Trusted Publishing.

## Notes

- Reproducibility: Set `seed` to get the same result across runs.
- Categories: Use `categories()` to see available groups and restrict generation.
- Typing: This library ships `py.typed` for type checkers.