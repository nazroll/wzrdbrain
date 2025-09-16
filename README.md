# wzrdbrain

A library to generate random trick combinations for wizard skating. This library is available in Python and JavaScript versions.

[Rocker'd Magic Moves](https://rockerd.web.app) - a trick generator app for wizard skating, is using both libraries.

The mobile web app is utilizing the JavaScript library version. It runs offline.

The [Rocker'd](https://rockerd.web.app) RESTFul API endpoints is using the Python library. Read the [API docs](https://rockerd.web.app/api/docs). 

## Usage

### Python


```bash
pip install wzrdbrain
```

The primary function is `generate_combo`, which returns a list of trick dictionaries. You can also create `Trick` objects directly for more control.

```python
from wzrdbrain import generate_combo, Trick

# Generate a combo of 3 tricks
# To get just the names of the tricks in the combo:
combo = generate_combo(3)
trick_names = [trick['name'] for trick in combo]
print(trick_names)
# Example output: ['front open gazelle', 'fakie 360', 'back open lion']
#
```

### JavaScript

```
https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain/src/wzrdbrain/wzrdbrain.min.js
```

This library also provides a JavaScript version of the trick generation logic, which can be used in any environment that supports ES6 modules.

```javascript
import { generateCombo } from 'https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain/src/wzrdbrain/wzrdbrain.min.js';

// Generate a combo of 3 tricks
const combo = generateCombo(3);

// Get the names of the tricks
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
```

For more examples, read the [usage documentation](./docs/usage.md).

## Contribution

We welcome contributions! `wzrdbrain` is fully open source (Apache 2.0), and we encourage the community to:

- Submit a new move/trick into the database.
- Report bugs and suggest features
- Improve documentation
- Submit code improvements

To contribute to this project, please read the [contributing guide](CONTRIBUTING.md).

## Credits

Many thanks to the skaters and the wizard skating community for their valuable feedback and support. Special thanks to:

- Billy Arlew: for being a reliable source of inspiration and domain knowledge to the wizard tricks dictionary.
- Eelco Soesman: for being a supportive Slightly Rockerd crew and early tester.
- Bas Bavinck: for being the beacon of wizardry with his book and supporting this project.
