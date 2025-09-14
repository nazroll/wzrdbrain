import os
import json
from pathlib import Path
from google import genai

# --- Configuration ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

# Use pathlib for more robust path handling
PROJECT_ROOT = Path(__file__).parent.parent.parent
PYTHON_SOURCE_PATH = PROJECT_ROOT / "src" / "wzrdbrain" / "wzrdbrain.py"
TRICK_DATA_PATH = PROJECT_ROOT / "src" / "wzrdbrain" / "tricks.json"
JS_OUTPUT_PATH = PROJECT_ROOT / "src" / "wzrdbrain" / "wzrdbrain-flash.js"
MODEL_NAME = "gemini-2.5-flash"


def read_file_content(filepath: Path) -> str:
    """Reads the content of a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()


def write_file_content(filepath: Path, content: str):
    """Writes content to a file, creating directories if necessary."""
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)


def construct_prompt(python_code: str, trick_data_json: str) -> str:
    """Constructs the detailed prompt for the AI model."""
    return f"""
You are an expert Python to JavaScript translator. Your task is to translate the provided Python script into a single, self-contained, vanilla JavaScript file that uses ES6 modules.

**Translation Requirements:**

1.  **Source of Truth:** The provided Python code and `tricks.json` data are the single source of truth. The generated JavaScript must be a direct and accurate translation of this logic.
2.  **No External Dependencies:** The final JavaScript file must be pure, vanilla JavaScript with no external libraries or dependencies.
3.  **ES6 Modules:** Use `export` for the `Trick` class and `generateCombo` function so they can be imported by other modules.
4.  **Data Handling:**
    *   The contents of `tricks.json` are provided below. Do NOT attempt to `fetch` this data in the JavaScript code.
    *   Instead, convert the JSON data into JavaScript `const` variables at the top of the file.
    *   The `RULES` from the JSON should be converted into JavaScript `Set` objects for efficient lookups, just like the Python version.
5.  **Class Translation:**
    *   Translate the Python `Trick` dataclass into a JavaScript `class Trick`.
    *   The constructor should handle default random values for unspecified properties, mirroring the `__post_init__` logic.
    *   Implement a `getName()` method equivalent to the Python `__str__` method.
    *   Implement a `toObject()` method equivalent to the Python `to_dict()` method.
6.  **Function Translation:**
    *   Translate the `generate_combo` Python function into a `generateCombo` JavaScript function.
    *   Ensure the logic for generating subsequent tricks is efficient. Pre-calculate the set of valid subsequent moves and pick randomly from that set, just like the Python `SUBSEQUENT_MOVES` implementation. Avoid inefficient `while(true)` loops.
7.  **Code Style & Comments:**
    *   Maintain clean, readable code.
    *   Include JSDoc comments for the exported class and function, explaining what they do, their parameters, and what they return.
    *   Add a header comment with author and license information: `@author Nazrul Kamaruddin` and `@license Apache-2.0`.

**`tricks.json` Data:**
```json
{trick_data_json}
```

**Python Source Code (`wzrdbrain.py`):**
```python
{python_code}
```

Now, generate the complete `wzrdbrain.js` file based on these instructions. Output ONLY the JavaScript code inside a single markdown block.
"""


def translate_code() -> str:
    """Orchestrates the translation process."""
    print("Reading source files...")
    python_code = read_file_content(PYTHON_SOURCE_PATH)
    trick_data_json = read_file_content(TRICK_DATA_PATH)

    print("Constructing prompt...")
    prompt = construct_prompt(python_code, trick_data_json)

    print(f"Sending request to Google Gemini API using model '{MODEL_NAME}'...")
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model=MODEL_NAME, contents=prompt
    )

    # Add robust error handling for the API response
    try:
        # Accessing response.text can raise a ValueError if the response was blocked.
        response_content = response.text
    except ValueError as e:
        # Provide more context on the error.
        raise ValueError(f"API response was blocked or invalid. Reason: {response.prompt_feedback}") from e

    # Extract the code from the markdown block
    if '```javascript' not in response_content:
        raise ValueError("Could not find a JavaScript markdown block in the AI response.")

    js_code = response_content.split('```javascript\n', 1)[-1].split('```')[0]

    if not js_code.strip():
        raise ValueError("Extracted JavaScript code is empty.")

    return js_code.strip()


if __name__ == "__main__":
    print("Starting Python to JavaScript translation process...")
    try:
        generated_js = translate_code()
        print(f"Successfully translated code. Writing to '{JS_OUTPUT_PATH}'...")
        write_file_content(JS_OUTPUT_PATH, generated_js)
        print("Translation complete.")
    except Exception as e:
        print(f"Translation process failed: {e}")
        exit(1)