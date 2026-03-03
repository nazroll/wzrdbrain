# Contributing to wzrdbrain

First off, thank you for considering contributing! It's people like you that make this project better for the whole Wizard Skating community.

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating in this project, you agree to uphold this code.

We've created different ways to contribute depending on your comfort level with code.

## Adding a new trick (for skaters & non-developers)

This is the most valuable contribution for the project! If you know a trick that's missing, here are two ways to add it.

### The easiest way: Suggest a trick

If you're not comfortable with editing files or using Git, the best way to contribute is to **open an issue** on GitHub.

1.  Go to the Issues tab.
2.  Click "New Issue".
3.  Give it a title like "Add trick: [Your Trick Name]".
4.  In the description, please provide as much detail as you can about the trick. For example:
    *   What direction are you traveling? (front or back)
    *   What stance are you in? (open or closed)
    *   What edge is the leading foot on? (inside, outside, or center)
    *   Does the trick rotate you? (e.g., 180 degrees, changing front to back)
    *   How many feet are on the ground? (1 or 2)
5.  Submit the issue, and we'll take care of adding it to the library!

### The hands-on way: Edit the moves.json file directly

If you're feeling a bit more adventurous, you can add the trick yourself directly on GitHub. You don't need to install anything on your computer.

1.  Go to `src/wzrdbrain/moves.json`.
2.  Click the pencil icon in the top right corner to start editing.
3.  **Add your move** as a new entry in the `"moves"` array. Each move needs:
    *   `id`: A unique identifier (e.g., `"my_trick_f_o"` for front + open)
    *   `name`: Human-readable name (e.g., `"Front My Trick (Open)"`)
    *   `category`: One of `base`, `turn`, `transition`, `manual`, `pivot`, `slide`, `swivel`
    *   `stage`: Difficulty tier from 1 (beginner) to 5 (advanced)
    *   `mechanics`: `feet` (1 or 2), `is_rotation` (true/false), `degrees` (0, 90, 180, 360, 540), `rotation_type` (`natural`, `switch`, or `neutral`)
    *   `entry`: The physical state required to start the trick — `direction`, `edge`, `stance`, `point`
    *   `exit`: How the trick changes the skater's state — using `same`/`opposite` for relative changes or absolute values
4.  **Tip**: Copy an existing move that's similar to yours and modify the values.
5.  **Propose the change**:
    *   Scroll to the bottom of the page.
    *   In the first box, type a short message like `feat: add [trick name]`.
    *   Click the green "Propose changes" button. This will take you to a new page to create a "Pull Request".
    *   Click "Create pull request".

That's it! You don't need to worry about running tests. We'll review your change, run the quality checks, and merge it into the project.

For more details on the state model and edge conventions, see [the research doc](./docs/moves_research.md).

---

## Contributing code (for developers)

If you'd like to fix a bug or add a new feature to the Python or JavaScript code, this section is for you.

### Submitting changes

1.  Fork the repository and create a new branch for your feature or bug fix.
2.  Make your changes and commit them. Use clear, concise messages (e.g., `feat: add X`, `fix: correct Y`).
3.  Push your branch and open a pull request.
4.  In your pull request, describe the changes you've made.

### Development setup

1.  **If you haven't already, fork the repository on GitHub.**
    * Go to https://github.com/wzrdbrain/wzrdbrain and click "Fork" in the top right.

2.  **Clone your fork:**
    ```bash
    git clone <your-fork-url>
    cd wzrdbrain
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
    ```

3.  **Install dependencies:**
    This command installs the project itself along with tools like `pytest`, `ruff`, and `mypy`.
    ```bash
    pip install -e ".[dev]"
    ```

### Running quality checks

Before submitting a pull request, please ensure your code passes all quality checks. We have a GitHub Action that will run these for you, but it's good practice to run them locally first.

#### Linting and formatting

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
