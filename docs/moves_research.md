# Wizard Skating Move Research & Schema

This document outlines the research and methodology for the **State-Transition Model** in `wzrdbrain`. It synthesizes findings from the original research, a cross-reference review against primary sources, and a counter-analysis of architectural trade-offs.

## 1. Objective

Evolve the library from a flat rule list (`tricks.json` with 4 rule categories) into a **physics-aware grammar**. Moves are modeled as state transformations so that generated combinations are physically executable, not just name-sequenced.

## 2. Research Sources

| Source | Content Available | Notes |
|--------|-------------------|-------|
| [Wizard Skating Official Moves](https://wizardskating.com/pages/moves) | Full move list | Canonical reference |
| [Eccentric Inline - Base Moves](https://eccentricinline.com/base/) | 8 base moves (FOG, FCG, BOG, BCG, FOL, FCL, BOL, BCL) | Index page; individual move pages have edge/stance detail |
| [Eccentric Inline - Base Combos](https://eccentricinline.com/base-combos/) | 8 combo variants (FOGS, FCGS, BOGS, BCGS, FOLS, FCLS, BOLS, BCLS) | "S" = sustained hold during transition |
| [Eccentric Inline - Bonus Moves](https://eccentricinline.com/bonus/) | Same-Edge Swivels (Stunami, UFO Swivel), Two-Footed Manuals (Toe Press, Heel Press) | Stunami and UFO are both "Same-Edge Swivels" |
| [Eccentric Inline - Beyond Moves](https://eccentricinline.com/beyond/) | "Coming Soon!" — names only | Negative Space, Wall Kicks, Toe Drag, Heel Drag, Hyperextension, Folding/Shifty |
| [Eccentric Inline - Pivot Moves](https://eccentricinline.com/the-pivot-moves/) | 8 pivots (FOTP, FCTP, BOTP, BCTP, FOHP, FCHP, BOHP, BCHP) | All direction+stance combos documented |

### Key findings from individual move pages

- **FOG (Front Open Gazelle)**: Entry on front **outside** edge, exit on back **inside** edge. Trajectory shaped like a "#3". Weight on balls of feet (toe-biased pivot).
- **FOL (Front Open Lion)**: Entry on front **inside** edge, exit on back **outside** edge. One-footed. Rolling foot traces a "#3" trajectory.
- **Stunami/UFO Swivel**: Both categorized as "Same-Edge Swivels" by Eccentric Inline, not as separate categories.

## 3. The Wizard Grammar

Five core dimensions define a move's physical state:

| Dimension | Values | Description |
|-----------|--------|-------------|
| **Direction** | `front`, `back` | Direction of travel relative to the skater's body |
| **Edge** | `inside`, `outside`, `center` | Which side of the wheels carries weight |
| **Stance** | `open`, `closed`, `neutral` | Relative position of knees and scissored feet |
| **Point** | `toe`, `heel`, `all` | Weight distribution on the rocker (front vs. back wheels) |
| **Lead Foot** | `same`, `opposite` | Whether the guiding foot changes after the move |

Additional mechanics metadata: `rotation_type` (natural/switch/neutral), `degrees`, `feet` (1 or 2).

## 4. Edge Behavior: Gazelles vs. Lions

This is the most nuanced area of the research. Source verification revealed important distinctions:

### One-footed moves (Lions)
- **Open stance → Inside edge** entry (confirmed by FOL page)
- **Closed stance → Outside edge** entry
- Single `edge` property works because only one foot is on the ground

### Two-footed moves (Gazelles)
- **Open stance → Outside edge** entry for the leading foot (confirmed by FOG page)
- But both feet are on the ground on *corresponding* edges (left outside + right inside)
- A single `edge` property cannot fully describe this — it's a **schema limitation**

### The "Triple Switch"
In both Gazelle and Lion transitions, three things change simultaneously:
1. **Direction**: front ↔ back
2. **Edge**: inside ↔ outside
3. **Point**: heel ↔ toe

This is confirmed by Eccentric Inline's FOG description showing entry on outside/heel transitioning to exit on inside/toe.

### Data correction needed

The current `moves.json` has `gazelle_f_o` with entry edge `inside`. Per Eccentric Inline's FOG page, this should be `outside`. The research doc's Section 5 correctly states "a Front Gazelle requires an `outside` edge" but the data contradicts this.

**Recommended fix**: For two-footed moves, the `edge` property should represent the *leading foot's* edge. This makes FOG entry = `outside` (leading foot on outside edge) and keeps Lions consistent (FOL entry = `inside`).

## 5. Move Categorization

### Stages (progression tiers)

| Stage | Category | Moves | Focus |
|-------|----------|-------|-------|
| 1 | Base | Predators | Weight distribution, staggered stance |
| 2 | Turns | Parallel, Tree | Carving arcs |
| 3 | Transitions | Gazelles, Lions | Core wizard skating (3-turns) |
| 4 | Advanced | Pivots, Same-Edge Swivels, Manuals | Isolated wheel/edge work |

### Category corrections from source verification

| Move | PR #23 category | Eccentric Inline category | Correct category |
|------|----------------|--------------------------|-----------------|
| Stunami | `manual` | Same-Edge Swivel | `swivel` |
| UFO Swivel | `transition` | Same-Edge Swivel | `swivel` |
| Toe Press | (not defined) | Two-Footed Manual | `manual` |
| Heel Press | (not defined) | Two-Footed Manual | `manual` |

The schema's `category` enum should include `swivel` alongside `base`, `turn`, `transition`, `manual`, `pivot`, `slide`.

## 6. The State-Transition Model

Moves are defined by **Entry** (required skater state) and **Exit** (resulting state after the move).

### Entry requirements
A move can only begin if the skater's current state matches the move's entry criteria.

### Exit transformations
Exit states use relative values (`same`, `opposite`) resolved against the entry:
- `"same"` → keep current value
- `"opposite"` → flip (front↔back, inside↔outside, open↔closed)
- Absolute values (`"toe"`, `"heel"`) override directly

### Combo generation logic
1. Select a starting move (typically Stage 1)
2. Resolve the move's exit state
3. Filter library for moves whose entry matches the current exit
4. If no match exists → insert a **State Reset** step (see Section 7) or end the combo
5. Repeat until desired length is reached

## 7. Open Problems

### 7a. Dead-ends and State Resets

With strict state matching, the generator can reach states where no valid next move exists (e.g., backward + toe point with few candidates). Three approaches:

1. **Document the behavior**: API returns *up to* N tricks. Callers handle short combos.
2. **State Reset steps**: Insert implicit transitions (e.g., "shift edge from inside to outside") that represent the skater adjusting their body between tricks. These are physically real — skaters do this constantly.
3. **Relaxed matching**: Match on direction only, treating edge/point as soft preferences. Simpler but less physically accurate.

**Recommendation**: Option 2 (State Resets) best preserves physical accuracy while avoiding dead-ends. A reset step changes the skater's state without constituting a named trick.

### 7b. Two-footed edge representation

The current schema uses a single `edge` string. For two-footed moves, this is ambiguous because each foot is on a different edge. Options:

1. **Leading-foot convention**: `edge` refers to the leading foot's edge (current implicit approach)
2. **Dual-edge object**: `{"lead": "outside", "trail": "inside"}` — more accurate but adds complexity
3. **Derived from stance**: Since open+gazelle always implies a specific edge pairing, edge could be computed from stance + move type

**Recommendation**: Option 1 (leading-foot convention) for simplicity, explicitly documented. Option 2 if the engine later needs to validate foot-specific positioning.

### 7c. Randomness and variety

The old system randomly chose direction and stance per trick. The new system only produces states defined in `moves.json`. To restore variety:

- Each move definition covers one direction+stance combination (e.g., `gazelle_f_o` = front open)
- All variants must be defined: `gazelle_f_c`, `gazelle_b_o`, `gazelle_b_c` etc.
- Alternatively, define moves with parameterized entries and resolve variants at generation time

### 7d. Move coverage gap

The current `moves.json` defines 11 moves. The old `tricks.json` had 26 (with direction/stance applied dynamically). To reach parity:

| Category | Defined | Needed | Missing |
|----------|---------|--------|---------|
| Base (Predators) | 2 | 3+ | predator one, closed variants |
| Turns | 2 | 4+ | closed and back variants |
| Transitions (Gazelle/Lion) | 3 | 12+ | all closed/back variants |
| Spins | 0 | 3 | 180, 360, 540 |
| Slides | 0 | 7 | parallel, soul, acid, mizu, star, fast, back |
| Presses | 0 | 2 | toe press, heel press |
| Rolls | 0 | 2 | toe roll, heel roll |
| Pivots | 2 | 8 | closed and additional direction variants |
| Swivels | 2 | 4+ | back variants |

## 8. Schema Definition

The formal structural rules are published in `src/wzrdbrain/move_schema.json`. The schema should be updated to:

1. Add `swivel` to the category enum
2. Document the leading-foot edge convention for two-footed moves
3. Consider adding an optional `edges` object for dual-foot specificity

## 9. References

- Eccentric Inline FOG page: entry = front outside edge, trajectory = "#3" shape
- Eccentric Inline FOL page: entry = front inside edge, one-footed "#3" trajectory
- Eccentric Inline Bonus page: Stunami + UFO Swivel = "Same-Edge Swivels"; Toe/Heel Press = "Two-Footed Manuals"
- Eccentric Inline Pivots page: 8 variants across all direction+stance combinations
- Eccentric Inline Beyond page: content not yet published ("Coming Soon!")
