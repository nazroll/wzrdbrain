# Contributing to wzrdbrain

First off, thank you for considering contributing!

## Submitting Changes

1.  Create a new branch for your feature or bug fix.
2.  Make your changes and commit them.
3.  Use clear, concise messages (e.g., feat: add X, fix: correct Y).
4.  Ensure all quality checks pass.
5.  Push your branch and open a pull request.

## Development Setup

To get started with development, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-fork-url>
    cd wzrdbrain
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
    ```

3.  **Install the package in editable mode with development dependencies:**
    This command installs the project itself along with tools like `pytest`, `ruff`, and `mypy`.
    ```bash
    pip install -e ".[dev]"
    ```

## Running Quality Checks

Before submitting a pull request, please ensure your code passes all quality checks.

### Linting and Formatting

We use `ruff` for linting and `black` for formatting.

```bash
# Check for linting errors
ruff check .

# Format the code
black .
```

### Type Checking

We use `mypy` for static type checking.

```bash
mypy .
```

### Running Tests

We use `pytest` for running unit tests.

```bash
pytest
```
