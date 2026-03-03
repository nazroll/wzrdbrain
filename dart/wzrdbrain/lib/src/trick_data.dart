import 'dart:convert';
import 'dart:io';

class TrickData {
  static final TrickData _instance = TrickData._internal();

  factory TrickData() {
    return _instance;
  }

  TrickData._internal();

  late final List<String> directions;
  late final List<String> stances;
  late final List<String> moves;
  late final Set<String> onlyFirst;
  late final Set<String> useFakie;
  late final Set<String> rotatingMoves;
  late final Set<String> excludeStanceBase;
  late final Set<String> excludeStance;
  late final Set<String> subsequentMoves;

  Future<void> loadTricks(String path) async {
    final file = File(path);
    final content = await file.readAsString();
    final data = jsonDecode(content);

    directions = List<String>.from(data['DIRECTIONS']);
    stances = List<String>.from(data['STANCES']);
    moves = List<String>.from(data['MOVES']);

    final rules = data['RULES'] as Map<String, dynamic>;
    onlyFirst = Set<String>.from(rules['ONLY_FIRST']);
    useFakie = Set<String>.from(rules['USE_FAKIE']);
    rotatingMoves = Set<String>.from(rules['ROTATING_MOVES']);
    excludeStanceBase = Set<String>.from(rules['EXCLUDE_STANCE_BASE']);

    excludeStance = excludeStanceBase.union(useFakie);
    subsequentMoves = moves.toSet().difference(onlyFirst);
  }
}

final trickData = TrickData();
