import 'dart:math';

import 'package:wzrdbrain/src/trick_data.dart';

class Trick {
  String? direction;
  String? stance;
  String? move;
  String? enterIntoTrick;
  String? exitFromTrick;
  late final String name;

  Trick({this.direction, this.stance, this.move}) {
    // Input validation
    if (direction != null && !trickData.directions.contains(direction)) {
      throw ArgumentError('Invalid direction: $direction');
    }
    if (stance != null && !trickData.stances.contains(stance)) {
      throw ArgumentError('Invalid stance: $stance');
    }
    if (move != null && !trickData.moves.contains(move)) {
      throw ArgumentError('Invalid move: $move');
    }

    // Generate default values
    direction ??= trickData.directions[Random().nextInt(trickData.directions.length)];

    move ??= trickData.moves[Random().nextInt(trickData.moves.length)];

    enterIntoTrick = direction;
    exitFromTrick = direction;

    // Automatically determine stance if not provided
    if (stance == null && !trickData.excludeStance.contains(move)) {
      stance = trickData.stances[Random().nextInt(trickData.stances.length)];
    }

    // Update exit direction for moves that rotate the body
    if (trickData.rotatingMoves.contains(move)) {
      if (direction == 'back') {
        exitFromTrick = 'front';
      } else if (direction == 'front') {
        exitFromTrick = 'back';
      }
    }

    // Set the display name
    name = _buildName();
  }

  String _buildName() {
    final parts = <String>[];
    String? displayDirection = direction;

    if (trickData.useFakie.contains(move)) {
      if (direction == 'back') {
        displayDirection = 'fakie';
      } else if (direction == 'front') {
        displayDirection = 'forward';
      }
    }

    if (displayDirection != null) {
      parts.add(displayDirection);
    }
    if (stance != null) {
      parts.add(stance!);
    }
    if (move != null) {
      parts.add(move!);
    }

    return parts.join(' ');
  }

  Map<String, dynamic> toJson() => {
        'direction': direction,
        'stance': stance,
        'move': move,
        'enter_into_trick': enterIntoTrick,
        'exit_from_trick': exitFromTrick,
        'name': name,
      };

  @override
  String toString() => name;
}
