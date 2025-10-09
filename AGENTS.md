# Agent Interaction Guide for wzrdbrain

This document provides instructions for AI agents and automated systems on how to interact with the `wzrdbrain` project.

## Project Overview

`wzrdbrain` is a Python library for generating random wizard skating trick combinations. It ensures logical transitions between tricks and can also create individual tricks. A JavaScript version of the library is also available. The current version is 0.1.6.

## API Usage

### Python

To generate a combo of tricks, use the `generate_combo` function:

```python
from wzrdbrain import generate_combo

# Generate a combo of 3 tricks
combo = generate_combo(3)

# Get the names of the tricks
trick_names = [trick['name'] for trick in combo]
print(trick_names)
```

### JavaScript

The generated JavaScript module can be used in any JavaScript environment that supports ES6 modules.

```javascript
import { generateCombo } from 'https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain/src/wzrdbrain/wzrdbrain.min.js';

// Generate a combo of 3 tricks
const combo = generateCombo(3);

// Get the names of the tricks
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
```

## Testing instructions

The project uses `pytest` for testing. The test files are located in the `tests` directory.

To run the tests, execute the following command:

```bash
pytest
```

## Project Structure

Key files in the project include:

-   **`pyproject.toml`**: Project configuration, metadata, and dependencies.
-   **`src/wzrdbrain/wzrdbrain.py`**: Core Python logic for trick generation.
-   **`src/wzrdbrain/tricks.json`**: Trick definitions, stances, and transition rules.
-   **`tests/test_wzrdbrain.py`**: Test suite for the project.
-   **`utils/translate2js.py`**: Utility script for translating Python to JavaScript.
-   **`src/wzrdbrain/wzrdbrain.js`**: Generated JavaScript version of the library.
-   **`utils/wzrdbrain.base.js`**: Base JavaScript logic for the translation script.

## Recent Changes

Version 0.1.6 includes a fix for the `package_data` syntax in `pyproject.toml` to ensure `tricks.json` is included in the package. Documentation has also been updated.
