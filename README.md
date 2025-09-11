# wzrdbrain

A library to generate random trick combinations for wizard skating.

## Installation

```bash
pip install wzrdbrain
```

## Usage

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

### Creating a Trick Object

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

## Development

To contribute to this project, please see the [Contributing Guide](CONTRIBUTING.md).

First, clone the repository and install the project in editable mode with its development dependencies:

```bash
git clone https://github.com/nazroll/wzrdbrain.git
cd wzrdbrain
pip install -e .[dev]
```

You can run the test suite using `pytest`:

```bash
pytest
```

## List of wizard skating tricks

The list of tricks in this library is not comprehensive. Please create an issue and give us your suggestions of new tricks
