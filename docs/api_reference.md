# API reference

Data structures used in `wzrdbrain`:

- [The Trick object](#the-trick-object)
- [Generating trick combos](#generating-trick-combos)

## The Trick object

The `Trick` object is the core data structure in `wzrdbrain`, representing a single wizard skating trick. It is available in both the Python and JavaScript versions of the library.

### Properties

A `Trick` object has the following properties:

| Property           | Type     | Description                                                                                                                                 |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `direction`        | `string` | The primary direction of the trick, either `front` or `back`. If not provided, a random direction is chosen.                                  |
| `stance`           | `string` | The skater's stance during the trick, either `open` or `closed`. This is automatically determined based on the `move`, unless specified.        |
| `move`             | `string` | The name of the specific maneuver being performed (e.g., `predator`, `gazelle`). If not provided, a random move is chosen.                     |
| `enter_into_trick` | `string` | The direction the skater is moving when entering the trick. Defaults to the `direction` property.                                           |
| `exit_from_trick`  | `string` | The direction the skater is moving when exiting the trick. This is influenced by rotating moves, which can change the exit direction.         |
| `name`             | `string` | The full, human-readable name of the trick (e.g., `fakie open gazelle`). This is a computed property generated from the other attributes.      |

### Behavior & logic

The `Trick` object is designed to be flexible. You can create a trick with specific attributes, or you can let the library generate a completely random one.

#### Randomization

If you create a `Trick` object without specifying all the properties, the library will automatically fill in the missing ones with random values. For example, if you only provide a `move`, the `direction` and `stance` will be chosen randomly.

#### Rules engine

The library uses a set of rules defined in `tricks.json` to ensure that the generated tricks are logical. These rules determine:

-   Some moves, like `predator`, do not have a stance. The library will not assign a stance to these tricks.
-   Moves like `gazelle` and `lion` are considered "rotating moves." If a trick uses one of these moves, the `exit_from_trick` direction will be the opposite of the `enter_into_trick` direction.
-   Certain moves, when performed in the `back` direction, are referred to as `fakie`. Similarly, when performed in the `front` direction, they are called `forward`. The `name` property will reflect this.

### Python vs. JavaScript

The implementation of the `Trick` object is nearly identical in both Python and JavaScript.

-   In Python, it is a `dataclass` that uses a `__post_init__` method to apply the randomization and rules.
-   In JavaScript, it is a `class` that applies the same logic within its `constructor`.

Both versions produce the same output and can be used interchangeably in their respective environments.

## Generating trick combos

The `generate_combo` function is the easiest way to create a sequence of random tricks. It is available in both the Python and JavaScript versions of the library.

### Python: `generate_combo()`

```python
from wzrdbrain import generate_combo

# Generate a combo of 3 tricks
combo = generate_combo(3)

# Get the names of the tricks
trick_names = [trick['name'] for trick in combo]
print(trick_names)
# Example output: ['back open gazelle', 'front closed lion', 'back open predator']
```

#### Arguments

-   `num_of_tricks` (optional, `int`): The number of tricks to generate. If not provided, a random number of tricks between 2 and 5 will be generated.

#### Returns

-   A `list` of `dict` objects, where each object represents a `Trick`.

### JavaScript: `generateCombo()`

```javascript
import { generateCombo } from './wzrdbrain.src.js';

// Generate a combo of 3 tricks
const combo = generateCombo(3);

// Get the names of the tricks
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
// Example output: ['back open gazelle', 'front closed lion', 'back open predator']
```

#### Arguments

-   `numTricks` (optional, `number`): The number of tricks to generate. If not provided (or `null`), a random number of tricks between 2 and 5 will be generated.

#### Returns

-   An `Array` of `Object` instances, where each object represents a `Trick`.

### Logic

The `generate_combo` function ensures that the generated sequence of tricks is logical:

1.  The first trick is chosen completely at random from all available moves.
2.  For each subsequent trick, the function ensures that its `enter_into_trick` direction matches the `exit_from_trick` direction of the previous trick.
3.  Certain moves (like `predator`) are only allowed to be the first trick in a combo. The function respects these restrictions.

