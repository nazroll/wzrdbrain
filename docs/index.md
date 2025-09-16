# Welcome to wzrdbrain

`wzrdbrain` is a library for generating random trick combinations for wizard skating. This documentation provides a guide for developers who want to use and contribute to the project.

## Table of Contents

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Python Usage](#python-usage)
  - [JavaScript Usage](#javascript-usage)
- [API Reference](#api-reference)
  - [The Trick Object](./trick_object.md)

## About The Project

`wzrdbrain` is designed to help wizard skaters discover new and creative trick combinations. By randomizing the sequence of tricks, it can help skaters break out of their usual patterns. The project provides both a Python and a JavaScript version of the library.

The JavaScript version is automatically generated from the Python source code using a translation script that leverages the Google Gemini API.

## Getting Started

### Python Usage

To get started with the Python version of `wzrdbrain`, first install the library using pip:

```bash
pip install wzrdbrain
```

Then, you can use the `generate_combo` function to create a sequence of random tricks:

```python
from wzrdbrain import generate_combo

# Generate a combo of 3 tricks
combo = generate_combo(3)

# Get the names of the tricks
trick_names = [trick['name'] for trick in combo]
print(trick_names)
```

### JavaScript Usage

The JavaScript version of the library can be used in any environment that supports ES6 modules.

```javascript
import { generateCombo } from './src/wzrdbrain/wzrdbrain.src.js';

// Generate a combo of 3 tricks
const combo = generateCombo(3);

// Get the names of the tricks
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
```

## API Reference

For more detailed information about the data structures used in `wzrdbrain`, please refer to the following documents:

- [The Trick Object](./trick_object.md)
