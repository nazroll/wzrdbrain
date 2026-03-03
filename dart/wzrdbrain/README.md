# wzrdbrain.dart

A Dart library to generate random wizard skating trick combinations.

This is a Dart port of the original [wzrdbrain](https://github.com/nazroll/wzrdbrain) Python library.

## Features

- Generate random combinations of wizard skating tricks.
- Ensures logical transitions between tricks.
- Load trick definitions from an external JSON file.

## Usage

1.  **Add the dependency**

    Add this to your package's `pubspec.yaml` file:

    ```yaml
    dependencies:
      wzrdbrain: <latest_version>
    ```

2.  **Initialize the library**

    Before you can generate combos, you must initialize the library by providing the path to your `tricks.json` file.

    ```dart
    import 'package:wzrdbrain/wzrdbrain.dart';

    void main() async {
      // Load the trick definitions
      await initWzrdbrain('path/to/your/tricks.json');

      // Now you can use the library
      final combo = generateCombo(numOfTricks: 3);

      for (var trick in combo) {
        print(trick['name']);
      }
    }
    ```

3.  **Generate Combos**

    Call `generateCombo` to get a list of tricks.

    ```dart
    // Generate a combo of 5 tricks
    final combo = generateCombo(numOfTricks: 5);

    // Generate a combo with a random number of tricks (2 to 5)
    final randomCombo = generateCombo();
    ```
