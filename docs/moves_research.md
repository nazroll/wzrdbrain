# Wizard Skating Move Research & Schema

This document outlines the research and methodology used to develop the **State-Transition Model** for wizard skating moves in `wzrdbrain`.

## 1. Objective
The goal was to evolve the library from a simple list of trick names to a **physics-aware grammar**. By modeling moves as transformations of a skater's state (direction, edge, stance, and weight distribution), we can generate combinations that are not just random, but physically executable.

## 2. Research Sources
The data schema and move library were derived from a comprehensive study of foundational wizard skating resources:
*   [Wizard Skating Official Moves](https://wizardskating.com/pages/moves)
*   [Eccentric Inline - Base Moves](https://eccentricinline.com/base/)
*   [Eccentric Inline - Base Combos](https://eccentricinline.com/base-combos/)
*   [Eccentric Inline - Bonus Moves](https://eccentricinline.com/bonus/)
*   [Eccentric Inline - Beyond Moves](https://eccentricinline.com/beyond/)
*   [Eccentric Inline - The Pivot Moves](https://eccentricinline.com/the-pivot-moves/)

## 3. The "Wizard Grammar"
Through research, we identified five core dimensions that define a wizard move's physical feasibility:

| Dimension | Values | Description |
| :--- | :--- | :--- |
| **Direction** | `front`, `back` | The direction of travel relative to the skater's body. |
| **Edge** | `inside`, `outside`, `center` | Which side of the wheels the weight is pressed into. |
| **Stance** | `open`, `closed`, `neutral` | The relative position of the knees and scissored feet. |
| **Point** | `toe`, `heel`, `all` | The primary weight distribution on the rocker (front vs. back wheels). |
| **Lead Foot** | `same`, `opposite` | Whether the "guiding" foot remains the same after the move. |
| **Rotation Type** | `natural`, `switch` | **Natural**: Rotating toward your trailing shoulder. **Switch**: Rotating toward your leading shoulder. |

## 4. The "Lion" and "Gazelle" Logic
Based on professional terminology, specific physical correlations exist:
*   **Open Stance**: Corresponds to **Inside Edges** for one-footed moves (Lions).
*   **Closed Stance**: Corresponds to **Outside Edges** for one-footed moves (Lions).
*   **The "Triple Switch"**: In a standard Gazelle/Lion transition, three things change simultaneously: Direction (Front/Back), Edge (Inside/Outside), and Weight Point (Heel/Toe).

## 5. The State-Transition Model
Instead of a flat list, moves are defined by their **Entry** and **Exit** states.

### Entry Requirements
A move can only be initiated if the skater's current state matches the move's `entry` criteria. For example, a **Front Gazelle** requires an `outside` edge and `front` direction.

### Exit Transformations
Each move transforms the state. A **Gazelle** is defined by a "Triple Switch":
1.  **Direction:** `front` -> `back` (Opposite)
2.  **Edge:** `outside` -> `inside` (Opposite)
3.  **Point:** `heel` -> `toe` (Opposite)

This logic is captured in `src/wzrdbrain/moves.json` using relative values like `"opposite"` or `"same"`.

## 5. Move Categorization (Stages)
We adopted the hierarchical staging used in the wizard skating community:
*   **Stage 1 (Base):** Predators. Focus on weight distribution and staggered stance.
*   **Stage 2 (Turns):** Parallel and Tree turns. Focus on carving arcs.
*   **Stage 3 (Transitions):** Gazelles and Lions. The core of wizard skating (3-turns).
*   **Stage 4+ (Advanced):** Pivots, Swivels, and Manuals. Moves that isolate specific wheels or edges.

## 6. Logical Combo Generation
By using this schema, the `wzrdbrain` engine can validate sequences:
1.  **Start:** Select a random Stage 1 move.
2.  **Filter:** Look for moves whose `entry` matches the current `exit`.
3.  **Sequence:** If a move ends on the "Toes" (Point: `toe`), the next move *must* be one that can start from the toes (like a Heel Pivot) or include a "Reset" step.

## 7. Schema Definition
The formal structural rules are published in `src/wzrdbrain/move_schema.json`. This ensures that any new moves added to the library adhere to the state-transition logic.
