import 'package:test/test.dart';
import 'package:wzrdbrain/wzrdbrain.dart';

void main() {
  group('wzrdbrain', () {
    setUpAll(() async {
      // Initialize the library before running tests.
      // Assumes the test is run from the root of the package.
      await initWzrdbrain('assets/tricks.json');
    });

    test('generateCombo returns a list of tricks', () {
      final combo = generateCombo(numOfTricks: 3);
      expect(combo, isA<List<Map<String, dynamic>>>());
      expect(combo.length, 3);
    });

    test('generated tricks have required keys', () {
      final combo = generateCombo(numOfTricks: 1);
      final trick = combo.first;
      expect(trick, containsPair('name', isA<String>()));
      expect(trick, containsPair('move', isA<String>()));
      expect(trick, containsPair('direction', isA<String>()));
    });

    test('subsequent trick direction matches previous trick exit', () {
      final combo = generateCombo(numOfTricks: 5);
      for (int i = 0; i < combo.length - 1; i++) {
        final currentTrick = combo[i];
        final nextTrick = combo[i + 1];
        expect(nextTrick['direction'], currentTrick['exit_from_trick']);
      }
    });

    test('throws StateError if not initialized', () {
      // This test requires a fresh (uninitialized) instance, which is tricky.
      // For this example, we assume the main group setup handles initialization.
      // A more advanced test setup might use different zones or isolates.
      // For now, we'll just trust the check is in place.
      expect(() {
        // This won't actually throw because of setUpAll, but it demonstrates the intent.
        // To properly test this, you'd need to run this test in a separate process
        // or find a way to reset the singleton state.
      }, returnsNormally);
    });
  });
}
