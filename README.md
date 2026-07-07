# wzrdbrain

`wzrdbrain` is a physics-aware combo generator for wizard skating. It models moves as state transitions — each trick transforms the skater's physical state (direction, edge, stance, weight point) so generated combinations are actually executable, not just random names.

If you're a wizard skater, the best way to use this project is through the [**Rocker'd Magic Moves**](https://rockerd.web.app) app!

The app is powered by this library and works on your phone, even offline.

Logic makes magic.

## How it works

Every move in the library defines an **entry state** (what the skater needs to be doing) and an **exit state** (what the skater ends up doing). The combo generator chains moves by matching exit states to entry states across all four physical dimensions (direction, edge, stance, weight point), producing sequences that flow naturally.

Matching uses a three-tier cascade: it prefers a fully continuous link (direction + point + edge + stance), falls back to matching direction + point, then to direction alone — so it never dead-ends. Each trick reports how continuous its link is via a `transition` field (`start`, `linked`, `edge_shift`, or `reset`), so the output is honest about where the skater makes an implicit adjustment.

The move library (`moves.json`) contains 68 move variants across 7 categories:

| Category | Examples | Count |
|----------|----------|-------|
| Base | Predator, Predator One | 4 |
| Turn | Parallel Turn, Tree Turn (front and back entries) | 8 |
| Transition | Gazelle, Lion, Lion S, Gazelle S, 180, 360, 540 | 22 |
| Pivot | Toe Pivot, Heel Pivot (all direction/stance combos) | 8 |
| Swivel | Stunami, UFO Swivel | 4 |
| Manual | Toe/Heel Press, Toe/Heel Roll | 8 |
| Slide | Parallel, Soul, Acid, Mizu, Star, Fast, Back | 14 |

## Contributing

We welcome contributions! `wzrdbrain` is an open-source project, and we encourage the community to help in many ways.

### Want to add a new trick?

This is the most common way for skaters to contribute! Add a new move entry to `src/wzrdbrain/moves.json` with its entry/exit states. See [the research doc](./docs/moves_research.md) for the state model and edge conventions.

To get started, please read our [**contributing guide**](./CONTRIBUTING.md) which will walk you through the process.

### Other ways to contribute

- Report bugs and suggest features
- Improve documentation
- Submit code improvements for the library

## For developers

### Python usage

Install the package from PyPI:
```bash
pip install wzrdbrain
```

Use `generate_combo` to get a list of trick dictionaries with full state information.
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

Each trick dict contains `id`, `name`, `category`, `stage`, a `transition` annotation describing its link to the previous trick (`start`/`linked`/`edge_shift`/`reset`), and `entry`/`exit` state objects. The `exit` object includes `direction`, `edge`, `stance`, `point`, plus `lead_foot` and `feet`.

### JavaScript

Earlier releases shipped an auto-generated JavaScript port. It was removed to cut maintenance; if you need it, pin the last release that included it via JSDelivr:

```
https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain@v0.4.1/src/wzrdbrain/wzrdbrain.js
```

## Credits

Many thanks to the wizard skating community for their valuable feedback and support. Special thanks to:

- Billy Arlew: for being a reliable source of inspiration and as a [domain knowledge expert on the wizard skating tricks dictionary](https://eccentricinline.com/).
- Eelco Soesman: for being a supportive Slightly Rockerd crew and early tester.
- Bas Bavinck: for being the beacon of wizardry with his book and supporting this project.

## License

This project is licensed under the Apache-2.0 Open Source Software License. See the [LICENSE](./LICENSE) file for details.
