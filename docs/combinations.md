---
hide:
  - navigation
---

# Understanding wzrdbrain Combinations

Analyzing the combinatorial possibilities of `wzrdbrain` is a great way to understand its logical structure. The total number of combinations is theoretically infinite because a combo can be of any length. However, we can calculate the number of possible unique tricks and the number of possible combos of a specific length.

## Calculating the Number of Unique Tricks

A single trick's properties (`direction`, `stance`, `move`) determine its uniqueness. The number of possible unique tricks is the foundation for calculating combo variations.

Let's define some variables based on the `tricks.json` file:
*   `M`: The total number of `MOVES`.
*   `E`: The number of moves in `exclude_stance`. These are moves that do not have a `stance` (e.g., `predator`).

A trick can be formed by combining `direction`, `move`, and potentially a `stance`.

1.  **Tricks with a stance**:
    *   Number of moves that can have a stance: `M - E`
    *   Number of directions: 2 (`front`, `back`)
    *   Number of stances: 2 (`open`, `closed`)
    *   Total: `(M - E) * 2 * 2 = 4 * (M - E)`

2.  **Tricks without a stance**:
    *   Number of moves that cannot have a stance: `E`
    *   Number of directions: 2 (`front`, `back`)
    *   Total: `E * 2`

The total number of unique tricks (`T`) is the sum of these two:
`T = 4 * (M - E) + 2 * E = 4M - 2E`

So, the total number of unique, valid tricks the system can generate is **`4 * (total_moves) - 2 * (moves_without_stance)`**.

## Calculating Combo Possibilities

The `generate_combo` function links tricks together, where the `enter_into_trick` direction of the next trick must match the `exit_from_trick` of the previous one. This creates a state machine where the number of choices for the next trick depends on the current one.

Let's add two more variables from your rules:
*   `R`: The number of `rotating_moves`. These moves flip the direction (e.g., `front` -> `back`).
*   `O`: The number of moves in `only_first`. These cannot appear after the first trick.

The number of combinations for a combo of length `N` is a more complex calculation involving probabilities at each step, as the code uses `random.choice`. However, if we consider the *number of possible sequences*, we can reason as follows:

1.  **First Trick (`C₁`)**: Any of the `T` unique tricks can be the first one.
    *   `C₁ = T = 4M - 2E`

2.  **Subsequent Tricks (`Cₙ` for n > 1)**: The choice of the next trick depends on the `exit_from_trick` of the previous one.
    *   The `move` must not be in `only_first`.
    *   The `direction` is fixed by the previous trick's exit.

Let's analyze the number of choices for the second trick, given the first trick:

*   **If the first trick was a rotating move:** The entry direction for the second trick is flipped.
*   **If the first trick was not a rotating move:** The entry direction for the second trick is the same.

For any subsequent trick, the direction is predetermined. The number of choices is based on the number of valid moves (`M - O`) and whether they take a stance.

*   Number of subsequent moves with a stance: `(M - O) - (E - (E ∩ O))`
*   Number of subsequent moves without a stance: `E - (E ∩ O)`

The number of choices for the second trick (and any subsequent one) is:
`Choices = 2 * ((M - O) - (E - (E ∩ O))) + 1 * (E - (E ∩ O))`
`Choices = 2(M - O) - (E - (E ∩ O))`

This shows that the number of possibilities doesn't grow as simply as `T^N`. Instead, it's a path through a state graph where each node is a trick and edges are valid transitions.

## Conclusion

While we can precisely calculate the number of unique tricks, the number of possible *combinations* is a function of the combo length (`N`) and the specific transition rules. The `generate_combo` function navigates these rules randomly.

To give a concrete number, one would need the exact contents of `tricks.json`. However, the formulas above provide the logical construct for calculating the number of possibilities.
