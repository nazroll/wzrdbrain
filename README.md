# wzrdbrain

`wzrdbrain` is the engine behind applications that generate random trick combinations for wizard skating. It helps skaters discover new and creative sequences of moves.

If you're a wizard skater, the best way to use this project is through the [**Rocker'd Magic Moves**](https://rockerd.web.app) app!

The app is powered by this library and works on your phone, even offline.

Logic makes magic.

## Contributing

We welcome contributions! `wzrdbrain` is an open-source project, and we encourage the community to help in many ways.

### Want to add a new trick?

This is the most common way for skaters to contribute! If you know a trick that's missing from the generator, you can add it to our list.

To get started, please read our [**contributing guide**](./CONTRIBUTING.md) which will walk you through the process.

### Other ways to contribute

- Report bugs and suggest features
- Improve documentation
- Submit code improvements for the Python or JavaScript libraries

## For developers

This library is available in both Python and JavaScript.

### Python usage

Install the package from PyPI:
```bash
pip install wzrdbrain
```

Use `generate_combo` to get a list of trick dictionaries.
```python
from wzrdbrain import generate_combo

# Generate a combo of 3 tricks and get their names
combo = generate_combo(3)
trick_names = [trick['name'] for trick in combo]
print(trick_names)
# Example output: ['front open gazelle', 'fakie 360', 'back open lion']
```

### JavaScript usage

You can use the ES6 module directly from the JSDelivr CDN.
```javascript
import { generateCombo } from 'https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain/src/wzrdbrain/wzrdbrain.min.js';

// Generate a combo of 3 tricks and get their names
const combo = generateCombo(3);
const trickNames = combo.map(trick => trick.name);
console.log(trickNames);
```

For more examples, see the [usage documentation](./docs/usage.md).

## Credits

Many thanks to the wizard skating community for their valuable feedback and support. Special thanks to:

- Billy Arlew: for being a reliable source of inspiration and as a [domain knowledge expert on the wizard skating tricks dictionary](https://eccentricinline.com/).
- Eelco Soesman: for being a supportive Slightly Rockerd crew and early tester.
- Bas Bavinck: for being the beacon of wizardry with his book and supporting this project.

## License

This project is licensed under the Apache-2.0 Open Source Software License. See the [LICENSE](./LICENSE) file for details.
