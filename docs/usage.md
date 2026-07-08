# Usage

Developers can integrate `wzrdbrain` into their Python applications.

## Table of contents


- [Python](./usage.md#python)
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
# Front Predator: front → front
# Front Open Gazelle: front → back
# Back Open Lion: back → front
```

## API reference

- [The Trick object](#the-trick-object)
- [Generating trick combos](#generating-trick-combos)

### The Trick object

The `Trick` object represents a single wizard skating trick with its resolved physical states.

#### Properties

A `Trick` object (returned as a dict/object from `generate_combo`) has the following properties:

| Property     | Type     | Description                                                              |
| ------------ | -------- | ------------------------------------------------------------------------ |
| `id`         | `string` | The unique move identifier (e.g., `gazelle_f_o`)                         |
| `name`       | `string` | Human-readable name (e.g., `Front Open Gazelle`)                       |
| `category`   | `string` | Move category: `base`, `turn`, `transition`, `manual`, `pivot`, `slide`, `swivel` |
| `stage`      | `int`    | Difficulty tier from 1 (beginner) to 5 (advanced)                        |
| `transition` | `string` | How this trick links to the previous one: `start`, `linked`, `edge_shift`, or `reset` (see [Logic](#logic)) |
| `entry`      | `object` | The skater's physical state when entering the trick                      |
| `exit`       | `object` | The skater's physical state when exiting the trick                       |

The `entry` and `exit` objects each contain:

| Property    | Type     | Description                                              |
| ----------- | -------- | -------------------------------------------------------- |
| `direction` | `string` | Direction of travel: `front` or `back`                   |
| `edge`      | `string` | Leading foot's edge: `inside`, `outside`, or `center`    |
| `stance`    | `string` | Foot position: `open`, `closed`, or `neutral`            |
| `point`     | `string` | Weight distribution: `toe`, `heel`, or `all`             |

The `exit` object additionally contains:

| Property    | Type     | Description                                                    |
| ----------- | -------- | -------------------------------------------------------------- |
| `lead_foot` | `string` | Whether the guiding foot changes after the move: `same` or `opposite` |
| `feet`      | `int`    | Number of feet on the ground: `1` or `2`                       |

#### Behavior & logic

The `Trick` resolves its exit state from relative definitions in the move library:
- `"same"` keeps the entry value
- `"opposite"` flips it (front↔back, inside↔outside, open↔closed)
- Absolute values (`"toe"`, `"heel"`) override directly

### Generating trick combos

The `generate_combo` function is the easiest way to create a sequence of random tricks.

#### `generate_combo()`

```python
from wzrdbrain import generate_combo

combo = generate_combo(3)
for trick in combo:
    print(f"{trick['name']}: {trick['entry']['direction']} → {trick['exit']['direction']}")
# Example output:
# Front Predator: front → front
# Front Open Gazelle: front → back
# Back Open Lion: back → front
```

#### Arguments

-   `num_of_tricks` (optional, `int`): The number of tricks to generate. If not provided, a random number between 2 and 5 is chosen.
-   `max_stage` (optional, `int`, default `5`): The maximum difficulty stage to include.
-   `terminology` (optional, `str`, default `"classic"`): The display style for trick names. `"classic"` keeps the canonical `Front X`/`Back X` names; `"fakie"` renders them as `Forward X`/`Fakie X`. Only the `name` field is affected — `id` and all state values keep the canonical `front`/`back` vocabulary.
-   `trick` (optional, `str`): The name of a move that must appear in the combo. Matching is case-insensitive, accepts fakie-style wording (`"Forward Open Gazelle"`, `"Fakie 540"`), and tolerates small typos; raises `ValueError` (with suggestions) if nothing matches. The move is woven in wherever the chain naturally reaches it — falling back to the first position — and is included even if its stage exceeds `max_stage` (the stage filter still applies to the other moves).

```python
combo = generate_combo(3, terminology="fakie")
# Example output names: Forward Open Gazelle, Fakie Open Lion

combo = generate_combo(3, trick="Front Open Gazelle")
# One of the three tricks is guaranteed to be Front Open Gazelle
```

#### Returns

-   A `list` of `dict` objects, where each object contains `id`, `name`, `category`, `stage`, `transition`, `entry`, and `exit`.

#### Logic

The `generate_combo` function chains tricks using physical state continuity:

1.  The first trick is chosen at random from all moves at or below the specified stage.
2.  For each subsequent trick, the function uses a three-tier cascade, preferring the most continuous link and widening only when needed:
    *   **Strict**: the next move's entry direction, weight point, edge AND stance all match the current exit state — a fully continuous link.
    *   **Mid** (fallback): entry direction and weight point match; the skater re-sets an edge/stance between tricks.
    *   **Relaxed** (last resort): only entry direction matches; the skater also re-distributes weight (point).
3.  Each emitted trick carries a `transition` annotation (`start`/`linked`/`edge_shift`/`reset`) recording which tier its link required.
4.  Direction is the one hard invariant preserved by every tier, so the function returns exactly N tricks as long as a direction-compatible move exists (always true for the current library); if none does, it returns the partial combo built so far rather than dead-ending.
