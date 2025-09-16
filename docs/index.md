# Welcome to wzrdbrain

`wzrdbrain` is a library for generating random trick combinations for wizard skating. This documentation provides a guide for developers who want to use and contribute to the project.

## Table of contents

- [About the project](#about-the-project)
- [Maintainers & contributors](#maintainers--contributors)
- [Getting started](./usage.md)
  - [Python usage](./usage.md#python-usage)
  - [JavaScript usage](./usage.md#javascript-usage)
  - [API reference](usage.md#api-reference)
    - [The Trick object](./usage.md#the-trick-object)
    - [Generating trick combos](./usage.md#generating-trick-combos)
- [Python-to-JS code translation](#python-to-js-code-translation)
- [Credits](#credits)


## About the project

`wzrdbrain`  is designed to help wizard skaters discover new trick combinations. By randomizing the sequence of tricks, it can help skaters break out of their usual patterns. 

The project provides both a Python and a JavaScript version of the library.

The JavaScript version is automatically generated from the Python source code using a translation script that leverages the Google Gemini API.

## Maintainers & contributors

[![contributors](https://contrib.rocks/image?repo=nazroll/wzrdbrain)](https://github.com/nazroll/wzrdbrain/graphs/contributors)

_**Disclosure:** AI coding assistant tools like Google Gemini CLI, Jules by Google and Github Copilot are used in this project._

## Getting started

For developers, read [usage.md](./usage.md) to learn how to install and use the library in Python and JavaScript.

## API reference

For more detailed information about the data structures used in `wzrdbrain`, please refer to the following documents:

- [The Trick object](./api_reference.md#the-trick-object)
- [Generating trick combos](./api_reference.md#generating-trick-combos)

## Python-to-JS code translation

The JavaScript version of the library (`src/wzrdbrain/wzrdbrain.js`) is automatically generated from the Python source code. For more details on this process, read [Translating Python code to JavaScript code](./translate2js.md).

## Credits

Many thanks to the skaters and the wizard skating community for their valuable feedback and support. Special thanks to:

- Billy Arlew: for being a reliable source of inspiration and domain knowledge to the wizard tricks dictionary.
- Eelco Soesman: for being a supportive Slightly Rockerd crew and early tester.
- Bas Bavinck: for being the beacon of wizardry with his book and supporting this project.
