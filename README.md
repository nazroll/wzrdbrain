# wzrdbrain

A library to generate random trick combinations for wizard skating.

## Installation

```bash
pip install wzrdbrain
```

## Usage (Python)

The primary function is `generate_combo`, which returns a list of trick dictionaries. You can also create `Trick` objects directly for more control.

```python
from wzrdbrain import generate_combo, Trick

# Generate a combo of 3 tricks
combo = generate_combo(3)

# The output is a list of dictionaries, each representing a trick
# print(combo)
# Example output:
# [
#     {
#         'direction': 'front', 'stance': 'open', 'move': 'gazelle', 
#         'enter_into_trick': 'front', 'exit_from_trick': 'back', 
#         'name': 'front open gazelle'
#     },
#     {
#         'direction': 'back', 'stance': None, 'move': '360', 
#         'enter_into_trick': 'back', 'exit_from_trick': 'back', 
#         'name': 'fakie 360'
#     },
#     # ... and so on
# ]

# To get just the names of the tricks in the combo:
trick_names = [trick['name'] for trick in combo]
print(trick_names)
# Example output: ['front open gazelle', 'fakie 360', 'back open lion']
```

### Creating a Trick object

You can create a `Trick` object with specific attributes. Any attributes not provided will be randomly generated.

```python
# Create a trick with a specific move
my_trick = Trick(move="lion s")

# Print the full trick object as a dictionary
print(my_trick.to_dict())
# Example output:
# {
#     'direction': 'back', 'stance': 'closed', 'move': 'lion s', 
#     'enter_into_trick': 'back', 'exit_from_trick': 'back', 
#     'name': 'back closed lion s'
# }
```

## Usage (JavaScript)

This library also provides a JavaScript version of the trick generation logic, which can be used in any environment that supports ES6 modules.

```javascript
import { generateCombo } from './src/wzrdbrain/wzrdbrain.src.js';

// Generate a combo of 3 tricks
const combo = generateCombo(3);

// Get the names of the tricks
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
```

### JavaScript translation

The JavaScript version of the library (`src/wzrdbrain/wzrdbrain.src.js`) is automatically generated from the Python source code using the `utils/translate2js.py` script. This script uses the Google Gemini API to perform the translation. To run the translation, you will need to have a `GEMINI_API_KEY` environment variable set.

The translation is also handled automatically by a GitHub Actions workflow, which will run the script and commit the changes to the repository whenever there are changes to the Python source code.

## Contribution

We welcome contributions! `wzrdbrain` is fully open source (Apache 2.0), and we encourage the community to:

- Submit a new move/trick into the database.
- Report bugs and suggest features
- Improve documentation
- Submit code improvements

To contribute to this project, please read the [contributing guide](CONTRIBUTING.md).

## Credits

Built with ❤️ by nazroll & friends. Many thanks to the skaters and the wizard skating community for their valuable feedback and support. Special thanks to:

- Billy Arlew: for being a reliable source of inspiration and domain knowledge to the wizard tricks dictionary.
- Eelco Soesman: for being a supportive Slightly Rockerd crew and early tester.
- Bas Bavinck: for being the beacon of wizardry with his book and supporting this project.