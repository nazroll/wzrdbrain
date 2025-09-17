# Contributing to wzrdbrain

First off, thank you for considering contributing! It's people like you that make this project better for the whole wizard skating community.

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
    *   Does it have a stance (open/closed)?
    *   Is it a rotating move (does it spin you 180 degrees)?
    *   Is it called "fakie" when done backward?
5.  Submit the issue, and we'll take care of adding it to the library!

### The hands-on way: Edit the tricks.json file directly

If you're feeling a bit more adventurous, you can add the trick yourself directly on GitHub. You don't need to install anything on your computer.

1.  Go to `src/wzrdbrain/tricks.json`.
2.  Click the pencil icon (✏️) in the top right corner to start editing.
3.  **Add your trick**:
    *   Scroll down to the `"MOVES"` list.
    *   Add your trick's name in quotes. **Please keep the list in alphabetical order.**
4.  **Update the rules (if needed)**:
    *   After the `MOVES` list, there's a `RULES` section. You might need to add your trick to one of these lists. Here’s what they mean in plain English:
        *   `ONLY_FIRST`: For tricks that only make sense at the start of a combo (e.g., `predator`).
        *   `USE_FAKIE`: For tricks called "fakie" when skating backward (instead of "back").
        *   `EXCLUDE_STANCE_BASE`: For tricks that don't have an "open" or "closed" stance (e.g., `360`).
        *   `ROTATING_MOVES`: For tricks that spin you 180 degrees, changing your direction for the next move (e.g., `gazelle`, `lion`).
5.  **Propose the change**:
    *   Scroll to the bottom of the page.
    *   In the first box, type a short message like `feat: add [trick name]`.
    *   Click the green "Propose changes" button. This will take you to a new page to create a "Pull Request".
    *   Click "Create pull request".

That's it! You don't need to worry about running tests. We'll review your change, run the quality checks, and merge it into the project.

---

## Contributing code (for developers)

If you'd like to fix a bug or add a new feature to the Python or JavaScript code, this section is for you.

### Submitting changes

1.  Fork the repository and create a new branch for your feature or bug fix.
2.  Make your changes and commit them. Use clear, concise messages (e.g., `feat: add X`, `fix: correct Y`).
3.  Push your branch and open a pull request.
4.  In your pull request, describe the changes you've made.

### Development setup

1.  **Clone your fork:**
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
