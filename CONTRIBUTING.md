# Contributing to wzrdbrain

First off, thank you for considering contributing!

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating in this project, you agree to uphold this code.

## Submitting changes

1.  Create a new branch for your feature or bug fix.
2.  Make your changes and commit them.
3.  Use clear, concise messages (e.g., feat: add X, fix: correct Y).
4.  Ensure all quality checks pass.
5.  Push your branch and open a pull request.

## Contributing a new move or trick

We welcome contributions of new tricks to the library! The list of tricks is managed in the `src/wzrdbrain/tricks.json` file.

To add a new trick, follow these steps:

1.  Open `src/wzrdbrain/tricks.json`.
2.  Add your trick to the `MOVES` list. Please keep the list in alphabetical order.
3.  Update the `RULES` if necessary. If your trick has special properties, you may need to add it to one of the lists in the `RULES` section:
    *   `ONLY_FIRST`: Moves that can only appear as the first trick in a combo.
    *   `USE_FAKIE`: Moves that should be prefixed with "fakie" instead of "back".
    *   `EXCLUDE_STANCE_BASE`: Moves that do not have a stance (e.g., "open", "closed").
    *   `ROTATING_MOVES`: Moves that change the skater's rotation, affecting the next trick's entry.

After making your changes, be sure to run the test suite to ensure everything is working correctly. See the "Running Quality Checks" section for more details.

Once you have verified your changes, please see the "Submitting Changes" section for instructions on how to open a pull request.

## Development setup

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

## Running quality checks

Before submitting a pull request, please ensure your code passes all quality checks.

### Linting and formatting

We use `ruff` for linting and `black` for formatting.

```bash
# Check for linting errors
ruff check .

# Format the code
black .
```

### Type checking

We use `mypy` for static type checking.

```bash
mypy .
```

### Running tests

We use `pytest` for running unit tests.

```bash
pytest
```
