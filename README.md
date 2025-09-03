# wzrdbrain

A simple library to generate random trick combinations for wizard skating.

## Installation

```bash
pip install wzrdbrain
```

## Usage

```python
from wzrdbrain import generate_trick, generate_combo

# Generate a single trick as a list of its parts
print(generate_trick())
# Example output: ['front', 'open', 'lion']

# Generate a line of multiple tricks as formatted strings
print(generate_combo(3))
# Example output: ['front parallel', 'fakie toe press', 'forward 360']
```

## List of wizard skating tricks

The list of tricks in this library is not comprehensive. Please create an issue and give us your suggestions of new tricks to be added.

## Contributing

Contributions are welcome! Please see the [Contributing Guide](CONTRIBUTING.md) for details on how to set up your development environment, run tests, and submit changes.
