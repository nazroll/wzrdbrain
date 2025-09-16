# Translating Python code to JavaScript code

This document provides an overview of the `utils/translate2js.py` script, which is responsible for automatically generating the JavaScript version of the `wzrdbrain` library from its Python source.

## Overview

The `wzrdbrain` library is developed with a "Python-first" approach. The Python code in `src/wzrdbrain/wzrdbrain.py` is the single source of truth for the library's logic. To provide a JavaScript version for web-based applications, we use an automated translation process powered by the Google Gemini API.

The `translate2js.py` script orchestrates this process, ensuring that the JavaScript version (`wzrdbrain.src.js`) is a direct and accurate port of the Python implementation.

## How it works

The script performs the following steps:

1.  It reads the content of three key files:
    *   `src/wzrdbrain/wzrdbrain.py`: The Python source code.
    *   `src/wzrdbrain/tricks.json`: The JSON data file containing trick definitions and rules.
    *   `utils/wzrdbrain.base.js`: A reference JavaScript file that provides the desired structure, style, and conventions for the output.
2.  It constructs a detailed prompt for the Gemini LLM. This prompt includes the full content of all three source files and a precise set of instructions for the translation, such as:
    *   Embedding the `tricks.json` data directly into the JavaScript file as `const` variables.
    *   Converting Python data structures (like `set`) into their JavaScript equivalents (`Set`).
    *   Translating the Python `Trick` dataclass into a JavaScript `class`.
    *   Ensuring the final output is a self-contained ES6 module with no external dependencies.
3.  The script sends the generated prompt to the Gemini API and waits for the translated JavaScript code in response.
4.  It parses the API response, extracts the generated JavaScript code from the markdown block, and writes it to `src/wzrdbrain/wzrdbrain.src.js`.

## Information for developers

-   Any manual changes made to `src/wzrdbrain/wzrdbrain.src.js` will be overwritten the next time the translation script is run. **All logic changes must be made in the Python source file (`src/wzrdbrain/wzrdbrain.py`).**
-   The quality of the translation depends heavily on the quality of the prompt. The `construct_prompt` function in the script is carefully engineered to guide the AI. If the translation output is incorrect or needs adjustment, refining the instructions in this function is the first step.
-   The `utils/wzrdbrain.base.js` file serves as a template. While the core logic comes from Python, the AI uses this file to match the coding style, structure, and JSDoc comments.

## Usage

To run the translation script and regenerate the `wzrdbrain.src.js` file, follow these steps:

### Prerequisites

You must have a Google Gemini API key. Set it as an environment variable named `GEMINI_API_KEY`.

```bash
export GEMINI_API_KEY="your_api_key_here"
```

### Running the script

From the root of the project directory, execute the script:

```bash
python utils/translate2js.py
```

The script will print its progress and, upon completion, the `src/wzrdbrain/wzrdbrain.src.js` file will be updated.

## CI with Github Actions

The translation process is automated as part of the project's Github Actions CI pipeline, defined in `.github/workflows/ci.yml`.

### The `translate` job

Whenever changes are pushed to the repository that affect `src/wzrdbrain/wzrdbrain.py` or `src/wzrdbrain/tricks.json`, the CI workflow is triggered. After the test suite passes, the `translate` job automatically performs the following steps:

1.  It executes the `python utils/translate2js.py` script, using a `GEMINI_API_KEY` stored in the repository's secrets.
2.  It checks if the script generated a new or modified version of `src/wzrdbrain/wzrdbrain.src.js`.
3.  If changes are detected, a bot automatically commits the updated file directly to the working branch.

This automation ensures that the JavaScript file is always in sync with the Python source without any manual intervention. Developers only need to focus on updating the Python code, and the CI pipeline handles the rest.

