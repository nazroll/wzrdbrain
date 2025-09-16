# Usage

Developers can integrate `wzrdbrain` into their Python and/or Javascript applications.

## Python

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

## JavaScript

The JavaScript version of the library can be used in any environment that supports ES6 modules.

```javascript
import { generateCombo } from 'https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain/src/wzrdbrain/wzrdbrain.min.js';

// Generate a combo of 3 tricks
const combo = generateCombo(3);

// Get the names of the tricks
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
```