# Contributing

Thanks for your interest in contributing to wzrdbrain!

- Discuss major changes in an issue before opening a PR.
- Keep the public API minimal, well-documented, and typed.
- Run `ruff`, `black`, `mypy`, and `pytest` locally before pushing.
- Add or update tests for behavior changes.

## Dev setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Commit style

- Use clear, concise messages (e.g., `feat: add X`, `fix: correct Y`).
- Prefer small, focused PRs.