import 'dart:math';

import 'package:wzrdbrain/src/trick.dart';
import 'package:wzrdbrain/src/trick_data.dart';

export 'package:wzrdbrain/src/trick.dart';
export 'package:wzrdbrain/src/trick_data.dart';

/// Initializes the wzrdbrain library by loading trick data from the specified JSON file.
/// This must be called before using [generateCombo].
Future<void> initWzrdbrain(String jsonPath) async {
  await trickData.loadTricks(jsonPath);
}

/// Generates a combination of tricks.
///
/// Throws a [StateError] if [initWzrdbrain] has not been called.
List<Map<String, dynamic>> generateCombo({int? numOfTricks}) {
  // Ensure that the trick data has been loaded.
  if (trickData.moves.isEmpty) {
    throw StateError('initWzrdbrain() must be called before generateCombo().');
  }

  final random = Random();
  final numTricks = numOfTricks ?? (random.nextInt(4) + 2); // 2 to 5 tricks

  if (numTricks <= 0) {
    return [];
  }

  final trickObjects = <Trick>[];
  Trick? previousTrick;

  for (int i = 0; i < numTricks; i++) {
    Trick newTrick;
    if (i == 0) {
      // First trick: choose from all moves
      final move = trickData.moves[random.nextInt(trickData.moves.length)];
      newTrick = Trick(move: move);
    } else {
      // Subsequent tricks: choose from the pre-filtered set
      final requiredDirection = previousTrick!.exitFromTrick;
      final validMoves = trickData.subsequentMoves.toList();
      final move = validMoves[random.nextInt(validMoves.length)];
      newTrick = Trick(direction: requiredDirection, move: move);
    }

    trickObjects.add(newTrick);
    previousTrick = newTrick;
  }

  return trickObjects.map((trick) => trick.toJson()).toList();
}
