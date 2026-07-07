# Welcome to wzrdbrain

`wzrdbrain` is a library for generating random trick combinations for wizard skating. This documentation provides a guide for developers who want to use and contribute to the project.

## Table of contents

- [About the project](#about-the-project)
- [Maintainers & contributors](#maintainers--contributors)
- [Getting started](./usage.md)
  - [Python usage](./usage.md#python)
  - [API reference](./usage.md#api-reference)
    - [The Trick object](./usage.md#the-trick-object)
    - [Generating trick combos](./usage.md#generating-trick-combos)
- [Move research & schema](./moves_research.md)
- [Credits](#credits)


## About the project

`wzrdbrain` is designed to help wizard skaters discover new trick combinations. By randomizing the sequence of tricks, it can help skaters break out of their usual patterns.

The library is physics-aware: moves are modeled as state transitions (direction, edge, stance, weight point), so generated combinations are physically executable, not just random names. The research and state model behind this are documented in [Move research & schema](./moves_research.md).

`wzrdbrain` is a Python library. Earlier releases also shipped an auto-generated JavaScript port; it was removed in v0.5.0 to cut maintenance. If you need it, pin the last release that included it via JSDelivr: `https://cdn.jsdelivr.net/gh/nazroll/wzrdbrain@v0.4.1/src/wzrdbrain/wzrdbrain.js`

## Maintainers & contributors

[![contributors](https://contrib.rocks/image?repo=nazroll/wzrdbrain)](https://github.com/nazroll/wzrdbrain/graphs/contributors)

_**Disclosure:** AI coding assistant tools like Claude Code by Anthropic, Google Gemini CLI, Jules by Google and Github Copilot are used in this project._

## Getting started

For developers, read [usage.md](./usage.md) to learn how to install and use the library.

## API reference

For more detailed information about the data structures used in `wzrdbrain`, please refer to the following documents:

- [The Trick object](./usage.md#the-trick-object)
- [Generating trick combos](./usage.md#generating-trick-combos)

## Credits

Many thanks to the skaters and the wizard skating community for their valuable feedback and support. Special thanks to:

- Billy Arlew: for being a reliable source of inspiration and domain knowledge to the wizard tricks dictionary.
- Eelco Soesman: for being a supportive Slightly Rockerd crew and early tester.
- Bas Bavinck: for being the beacon of wizardry with his book and supporting this project.
