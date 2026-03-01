# PR #23 Review: State-Transition Move Schema and Library

## Context

PR #23 rewrites the wzrdbrain core from a flat rule-based system (direction + 4 rule categories) into a state-machine model where moves are defined by entry/exit physical states (direction, edge, stance, weight point). Research was sourced from Eccentric Inline. This review cross-references the PR's claims against the actual Eccentric Inline content and evaluates the implementation.

---

## Research Review

### What the research gets RIGHT

1. **The "Wizard Grammar" dimensions** — Direction, Edge, Stance, and Weight Point are real physical dimensions confirmed by Eccentric Inline:
   - FOG page: entry on front outside edge, exit on back inside edge, trajectory shaped like a "#3"
   - FOL page: entry on front inside edge, exit on back outside edge
   - Pivot page: all 8 direction+stance combos (FOTP, FCTP, BOTP, BCTP, FOHP, FCHP, BOHP, BCHP)

2. **The "Triple Switch" concept** — Gazelle/Lion transitions change Direction + Edge + Weight Point simultaneously. Confirmed by Eccentric Inline's FOG description.

3. **Staging** — Predators → Turns → Transitions → Advanced aligns with Eccentric Inline's site hierarchy.

4. **The "S" suffix** — Correctly identified as sustained/combo variant (Eccentric Inline lists FOGS, FCGS, BOGS, etc. under "Base Combos").

### What the research gets WRONG

1. **Gazelle edge entry is WRONG in `moves.json`** — Eccentric Inline's FOG page states entry is on front **outside** edge. But `moves.json` defines `gazelle_f_o` with entry edge `inside`. The research doc even contradicts itself — Section 5 says a Front Gazelle requires `outside` edge, but the data uses `inside`.

2. **Open/Closed ↔ Edge correlation is muddled** — Section 4 claims "Open Stance = Inside Edges for Lions" but doesn't clearly distinguish how this applies to Gazelles vs Lions. The Eccentric Inline sources show FOG = outside edge entry, FOL = inside edge entry — opposite patterns for the same "open" stance.

3. **Stunami miscategorized** — Eccentric Inline groups stunami under "Same-Edge Swivels" (with UFO Swivel). The PR categorizes stunami as `"manual"` and UFO as `"transition"`. Both should be the same category.

4. **Only 11 of 26 moves defined** — Missing: predator one, all closed variants, all back variants of gazelle/lion/gazelle-s, all slides (7), all spins (3), toe/heel press, toe/heel roll. Eccentric Inline explicitly lists all 8 base variants and all 8 combo variants.

5. **"Beyond" moves** — Eccentric Inline's page says "Coming Soon!" with just names (Negative Space, Wall Kicks, etc.). Not an issue but worth noting the source has no actual content here.

---

## Implementation Review

### Breaking changes (CRITICAL)

| Change | Old API | New API | Impact |
|--------|---------|---------|--------|
| `Trick` constructor | `Trick(direction="front", move="gazelle")` | `Trick("gazelle_f_o")` | All consumers break |
| `generate_combo` return | `{"name": "front open gazelle", "move": "gazelle", ...}` | `{"id": "gazelle_f_o", "name": "Front Gazelle (Open)", "entry": {...}, "exit": {...}}` | Rocker'd Magic Moves breaks |
| Combo count guarantee | Always returns exactly N tricks | Can return fewer if state machine dead-ends | Silent behavior change |
| No version bump | `__version__` still `"0.2.2"` | Should be `0.3.0` (semver major) | Consumers won't know |

### Correctness issues

1. **State machine dead-ends** — With 11 moves and strict direction+point matching, combos frequently terminate early. A move exiting on `toe`+`back` has very few candidates. The old system never got stuck.

2. **No randomness in direction/stance** — Old system randomly chose direction and stance per trick. New system only produces the exact entry states hardcoded in `moves.json`. With only open-stance variants, you'll never see closed-stance output.

3. **`_resolve_relative` edge cases** — `"center"` and `"neutral"` have no defined opposite, so `opposite` silently returns the same value. Not documented.

### Test regression

- Removed: invalid input validation test, ONLY_FIRST rule test, rotating move direction-flip test
- Weakened: combo length assertion from `== 3` to `> 0`
- Missing: test for invalid move IDs, test for early-exit path, test for `_resolve_relative` edge cases

---

## Verdict

| Aspect | Rating | Notes |
|--------|--------|-------|
| Research direction | Good | State-transition model is the right evolution |
| Research accuracy | Needs fixes | Gazelle edge entry wrong, stunami miscategorized |
| Move coverage | Incomplete | 11/26 moves, no closed variants |
| API compatibility | Breaking | Will break Rocker'd Magic Moves, no version bump |
| Combo reliability | Regression | Can return fewer tricks than requested |
| Test quality | Regression | Weaker assertions, missing edge cases |

## Recommendation: Do not merge as-is

The architectural direction is sound. But before merging:

1. **Fix gazelle edge entry** — should be `outside` per Eccentric Inline FOG source
2. **Add all 26 moves** (or at minimum match the old `tricks.json` coverage)
3. **Guarantee combo count** — add fallback/relaxation logic so `generate_combo(5)` always returns 5
4. **Bump version to 0.3.0** and document breaking changes
5. **Restore test coverage** to at least parity with the old suite
6. **Fix stunami category** — should match UFO swivel (both are same-edge swivels)

---

## Counter-Analysis

While the review accurately identifies several regressions and data errors, a few of its recommendations conflict with the philosophical goal of building a physics-aware grammar.

### 1. "State Machine Dead-Ends" vs. "Combo Count Guarantees"
The review suggests adding "fallback/relaxation logic" to guarantee `generate_combo(N)` always returns `N` tricks. 
*   **Counterpoint:** Forcing the generator to output exactly N tricks by relaxing the rules directly defeats the purpose of the state-machine. If a skater is in a state (e.g., Backward, Toe point) from which no valid trick in the library can physically flow, a "dead-end" is the correct result. Instead of silently breaking physical rules to force a match (generating impossible combos), the engine should either explicitly insert a "Reset/Transition" step, or the API should be documented to return *up to* N physically connected moves.

### 2. The "Open/Closed ↔ Edge" Muddling is a Schema Limitation
The review blames data entry for the confusion between Gazelle and Lion edge entries for the same "Open" stance.
*   **Counterpoint:** The root cause is a limitation in the newly proposed schema, which defines a single `edge` property (`inside`, `outside`, `center`). This works perfectly for one-footed Lions. However, Gazelles are two-footed and rely on *corresponding edges* (e.g., left outside + right inside). By forcing a two-footed move into a single `edge` string, the schema lacks the vocabulary to describe parallel edges accurately, leading to the noted contradictions.

### 3. API Breakage is Necessary
The review flags the changed `Trick` constructor and `generate_combo` return shape as critical breaks.
*   **Counterpoint:** While the failure to bump the major version (SemVer violation) is a critical error, the API *should* break. The old API returned flat strings; the new architecture returns richer objects (Entry/Exit states, mechanics). Reverting to the old return shape to maintain compatibility would hide the value of the new engine. The correct fix is a major version bump, accompanied by a backward-compatibility wrapper for instantiation, rather than reverting the output format.

### 4. Loss of Randomness
The review notes that the new system lacks the randomness of the old system, producing only exact entry states.
*   **Counterpoint:** This highlights a missing layer in the architecture. In a state-machine, randomness should apply to the *skater's state*, not just trick selection. For example, a skater gliding forward can proactively choose to shift to an outside or inside edge before initiating a turn. The current implementation lacks "State Shift" steps, making paths overly deterministic.

### Conclusion
The verdict of **"Do not merge as-is"** is correct due to SemVer violations, incomplete data, and test regressions. However, fixing it requires refining the schema to handle two-footed edges and adding deliberate state-reset mechanisms, rather than simply relaxing rules to force combo lengths.