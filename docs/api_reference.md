# API Reference

Data structures used in `wzrdbrain`:

- [The Trick Object](#the-trick-object)

## The Trick Object

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

### Behavior and Logic

The `Trick` object is designed to be flexible. You can create a trick with specific attributes, or you can let the library generate a completely random one.

#### Randomization

If you create a `Trick` object without specifying all the properties, the library will automatically fill in the missing ones with random values. For example, if you only provide a `move`, the `direction` and `stance` will be chosen randomly.

#### Rules Engine

The library uses a set of rules defined in `tricks.json` to ensure that the generated tricks are logical. These rules determine:

-   **Stance Exclusion**: Some moves, like `predator`, do not have a stance. The library will not assign a stance to these tricks.
-   **Rotation**: Moves like `gazelle` and `lion` are considered "rotating moves." If a trick uses one of these moves, the `exit_from_trick` direction will be the opposite of the `enter_into_trick` direction.
-   **"Fakie" and "Forward"**: Certain moves, when performed in the `back` direction, are referred to as `fakie`. Similarly, when performed in the `front` direction, they are called `forward`. The `name` property will reflect this.

### Python vs. JavaScript

The implementation of the `Trick` object is nearly identical in both Python and JavaScript.

-   In Python, it is a `dataclass` that uses a `__post_init__` method to apply the randomization and rules.
-   In JavaScript, it is a `class` that applies the same logic within its `constructor`.

Both versions produce the same output and can be used interchangeably in their respective environments.
