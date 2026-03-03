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

### Resolution

The `edge` property uses the **leading-foot convention**: for two-footed moves, `edge` refers to the leading foot's edge. This makes FOG entry = `outside` (leading foot on outside edge) and keeps Lions consistent (FOL entry = `inside`). All gazelle variants in `moves.json` now use `outside` edge entry; all open-stance lion variants use `inside` edge entry.

## 5. Move Categorization

### Stages (progression tiers)

| Stage | Category | Moves | Focus |
|-------|----------|-------|-------|
| 1 | Base | Predators | Weight distribution, staggered stance |
| 2 | Turns | Parallel, Tree | Carving arcs |
| 3 | Transitions | Gazelles, Lions | Core wizard skating (3-turns) |
| 4 | Advanced | Pivots, Same-Edge Swivels, Manuals | Isolated wheel/edge work |

### Category corrections (applied)

| Move | Was | Now | Source |
|------|-----|-----|--------|
| Stunami | `manual` | `swivel` | Eccentric Inline Bonus (Same-Edge Swivels) |
| UFO Swivel | `transition` | `swivel` | Eccentric Inline Bonus (Same-Edge Swivels) |
| Toe Press | (not defined) | `manual` | Eccentric Inline Bonus (Two-Footed Manuals) |
| Heel Press | (not defined) | `manual` | Eccentric Inline Bonus (Two-Footed Manuals) |

The schema's `category` enum now includes `swivel` alongside `base`, `turn`, `transition`, `manual`, `pivot`, `slide`.

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

## 7. Resolved Design Decisions

### 7a. Dead-ends → Two-tier matching

The generator uses two-tier candidate matching to guarantee `generate_combo(N)` always returns exactly N tricks:

1. **Strict** (preferred): next move's entry direction AND point must match current exit state
2. **Relaxed** (fallback): next move's entry direction must match current exit direction

The relaxed tier represents implicit state shifts (edge/point adjustments) that skaters naturally perform between tricks. This preserves direction continuity while avoiding dead-ends.

### 7b. Two-footed edge → Leading-foot convention

The `edge` property represents the **leading foot's** edge. For two-footed moves like gazelles, both feet are on corresponding edges (e.g., lead on outside, trail on inside), but only the lead foot's edge is recorded. This is documented in `move_schema.json`.

### 7c. Randomness → Explicit variant enumeration

All direction × stance combinations are defined as separate move entries (e.g., `gazelle_f_o`, `gazelle_f_c`, `gazelle_b_o`, `gazelle_b_c`). This provides full variety through the candidate pool without runtime parameterization.

### 7d. Move coverage → 64 variants

The library now defines 64 move variants covering all 26 base move types from the old `tricks.json`:

| Category | Count | Moves |
|----------|-------|-------|
| Base | 4 | Predator (f/b), Predator One (f/b) |
| Turn | 4 | Parallel Turn (o/c), Tree Turn (o/c) |
| Transition | 22 | Gazelle (4), Gazelle S (4), Lion (4), Lion S (4), 180 (2), 360 (2), 540 (2) |
| Pivot | 8 | Toe Pivot (f/b × o/c), Heel Pivot (f/b × o/c) |
| Swivel | 4 | Stunami (f/b), UFO Swivel (f/b) |
| Manual | 8 | Toe/Heel Press (f/b), Toe/Heel Roll (f/b) |
| Slide | 14 | Parallel, Soul, Acid, Mizu, Star, Fast, Back (each f/b) |

## 8. Schema Definition

The formal structural rules are published in `src/wzrdbrain/move_schema.json`. The schema includes:

- `swivel` in the category enum alongside `base`, `turn`, `transition`, `manual`, `pivot`, `slide`, `air`
- Leading-foot edge convention for two-footed moves (see Section 7b)

### Future consideration

An optional `edges` object (`{"lead": "outside", "trail": "inside"}`) could be added for dual-foot specificity if the engine later needs to validate foot-specific positioning.

## 9. References

- Eccentric Inline FOG page: entry = front outside edge, trajectory = "#3" shape
- Eccentric Inline FOL page: entry = front inside edge, one-footed "#3" trajectory
- Eccentric Inline Bonus page: Stunami + UFO Swivel = "Same-Edge Swivels"; Toe/Heel Press = "Two-Footed Manuals"
- Eccentric Inline Pivots page: 8 variants across all direction+stance combinations
- Eccentric Inline Beyond page: content not yet published ("Coming Soon!")
