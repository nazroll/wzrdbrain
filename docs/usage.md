# Usage

Developers can integrate `wzrdbrain` into their Python and/or Javascript applications.

## Table of contents


- [Python](./usage.md#python)
- [JavaScript](./usage.md#javascript)
- [API reference](usage.md#api-reference)
    - [The Trick object](./usage.md#the-trick-object)
    - [Generating trick combos](./usage.md#generating-trick-combos)

## Python

To get started with the Python version of `wzrdbrain`, first install the library using pip:

```bash
pip install wzrdbrain
```

Then, you can use the `generate_combo` function to create a sequence of random tricks:

```python
from wzrdbrain import generate_combo

combo = generate_combo(3)
for trick in combo:
    print(f"{trick['name']}: {trick['entry']['direction']} → {trick['exit']['direction']}")
# Example output:
# Front Predator (Open): front → front
# Front Gazelle (Open): front → back
# Back Lion (Open): back → front
```

## JavaScript

The JavaScript version of the library can be used in any environment that supports ES6 modules.

```javascript
import { generateCombo } from 'https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain@v0.3.0/src/wzrdbrain/wzrdbrain.js';

const combo = generateCombo(3);
combo.forEach(trick => {
    console.log(`${trick.name}: ${trick.entry.direction} → ${trick.exit.direction}`);
});
```

## API reference

- [The Trick object](#the-trick-object)
- [Generating trick combos](#generating-trick-combos)

### The Trick object

The `Trick` object represents a single wizard skating trick with its resolved physical states. It is available in both the Python and JavaScript versions of the library.

#### Properties

A `Trick` object (returned as a dict/object from `generate_combo`) has the following properties:

| Property   | Type     | Description                                                              |
| ---------- | -------- | ------------------------------------------------------------------------ |
| `id`       | `string` | The unique move identifier (e.g., `gazelle_f_o`)                         |
| `name`     | `string` | Human-readable name (e.g., `Front Gazelle (Open)`)                       |
| `category` | `string` | Move category: `base`, `turn`, `transition`, `manual`, `pivot`, `slide`, `swivel` |
| `stage`    | `int`    | Difficulty tier from 1 (beginner) to 5 (advanced)                        |
| `entry`    | `object` | The skater's physical state when entering the trick                      |
| `exit`     | `object` | The skater's physical state when exiting the trick                       |

The `entry` and `exit` objects each contain:

| Property    | Type     | Description                                              |
| ----------- | -------- | -------------------------------------------------------- |
| `direction` | `string` | Direction of travel: `front` or `back`                   |
| `edge`      | `string` | Leading foot's edge: `inside`, `outside`, or `center`    |
| `stance`    | `string` | Foot position: `open`, `closed`, or `neutral`            |
| `point`     | `string` | Weight distribution: `toe`, `heel`, or `all`             |

#### Behavior & logic

The `Trick` resolves its exit state from relative definitions in the move library:
- `"same"` keeps the entry value
- `"opposite"` flips it (front↔back, inside↔outside, open↔closed)
- Absolute values (`"toe"`, `"heel"`) override directly

#### Python vs. JavaScript

-   In Python, `Trick` is a `dataclass` that uses `__post_init__` to resolve states from the move library.
-   In JavaScript, `Trick` is a `class` that applies the same resolution logic in its `constructor`.

Both versions produce the same output structure.

### Generating trick combos

The `generate_combo` function is the easiest way to create a sequence of random tricks. It is available in both the Python and JavaScript versions of the library.

#### Python: `generate_combo()`

```python
from wzrdbrain import generate_combo

combo = generate_combo(3)
for trick in combo:
    print(f"{trick['name']}: {trick['entry']['direction']} → {trick['exit']['direction']}")
# Example output:
# Front Predator (Open): front → front
# Front Gazelle (Open): front → back
# Back Lion (Open): back → front
```

#### Arguments

-   `num_of_tricks` (optional, `int`): The number of tricks to generate. If not provided, a random number between 2 and 5 is chosen.
-   `max_stage` (optional, `int`, default `5`): The maximum difficulty stage to include.

#### Returns

-   A `list` of `dict` objects, where each object contains `id`, `name`, `category`, `stage`, `entry`, and `exit`.

#### JavaScript: `generateCombo()`

```javascript
import { generateCombo } from 'https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain@v0.3.0/src/wzrdbrain/wzrdbrain.js';

const combo = generateCombo(3);
combo.forEach(trick => {
    console.log(`${trick.name}: ${trick.entry.direction} → ${trick.exit.direction}`);
});
```

#### Arguments

-   `numTricks` (optional, `number`): The number of tricks to generate. If not provided (or `null`), a random number between 2 and 5 is chosen.
-   `maxStage` (optional, `number`, default `5`): The maximum difficulty stage to include.

#### Returns

-   An `Array` of `Object` instances with `id`, `name`, `category`, `stage`, `entry`, and `exit` properties.

#### Logic

The `generate_combo` function chains tricks using physical state continuity:

1.  The first trick is chosen at random from all moves at or below the specified stage.
2.  For each subsequent trick, the function uses two-tier matching:
    *   **Strict**: the next move's entry direction AND weight point must match the current exit state.
    *   **Relaxed** (fallback): only entry direction must match (implicit edge/point shift between tricks).
3.  This guarantees the function always returns exactly N tricks with no dead-ends.
