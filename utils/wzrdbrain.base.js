/**
 * @author Nazrul Kamaruddin
 * @license Apache-2.0
 */

// Move library from moves.json, embedded directly as a constant
const MOVE_LIBRARY = {
  "version": "1.0.0",
  "moves": [
    // ... moves will be populated here by the translator
  ]
};

const MOVES = Object.fromEntries(MOVE_LIBRARY.moves.map(m => [m.id, m]));

/**
 * Represents a single trick with its direction, stance, and move.
 * Resolves entry and exit states based on the move definition.
 */
export class Trick {
  /**
   * @param {string} moveId - The unique identifier for the move.
   */
  constructor(moveId) {
    const move = MOVES[moveId];
    if (!move) throw new Error(`Invalid move ID: ${moveId}`);

    this.moveId = moveId;
    this.name = move.name;
    this.category = move.category;
    this.stage = move.stage;

    // Entry states
    this.direction = move.entry.direction;
    this.edge = move.entry.edge;
    this.stance = move.entry.stance;
    this.point = move.entry.point;

    // Resolve Exit States
    this.exitDirection = this._resolveRelative(move.exit.direction, this.direction);
    this.exitEdge = this._resolveRelative(move.exit.edge, this.edge);
    this.exitStance = this._resolveRelative(move.exit.stance, this.stance);
    this.exitPoint = move.exit.point; // Point is always absolute
  }

  /**
   * Resolves relative state values (same/opposite).
   * @private
   */
  _resolveRelative(value, base) {
    if (value === "same") return base;
    if (value === "opposite") {
      const opposites = {
        front: "back",
        back: "front",
        inside: "outside",
        outside: "inside",
        open: "closed",
        closed: "open",
      };
      return opposites[base] || base;
    }
    return value;
  }

  /**
   * @returns {string} The human-readable name of the trick.
   */
  toString() {
    return this.name;
  }

  /**
   * @returns {object} Plain object representation of the trick.
   */
  toObject() {
    return {
      id: this.moveId,
      name: this.name,
      category: this.category,
      stage: this.stage,
      entry: {
        direction: this.direction,
        edge: this.edge,
        stance: this.stance,
        point: this.point,
      },
      exit: {
        direction: this.exitDirection,
        edge: this.exitEdge,
        stance: this.exitStance,
        point: this.exitPoint,
      },
    };
  }
}

/**
 * Applies realism constraints to candidate moves.
 * Returns empty array if category diversity cannot be satisfied,
 * signalling the caller to try a wider candidate pool.
 * @private
 * @param {object[]} candidates - Array of move objects.
 * @param {Trick[]} combo - Tricks selected so far.
 * @returns {object[]} Filtered candidates.
 */
function _applyRealismFilters(candidates, combo) {
  if (combo.length === 0) return candidates;

  const lastMove = MOVES[combo[combo.length - 1].moveId];
  let filtered = candidates;

  // Constraint 1 (highest priority): Max 2 consecutive same category
  // Returns empty if unsatisfiable so the caller widens the pool.
  if (combo.length >= 2) {
    const prevMove = MOVES[combo[combo.length - 2].moveId];
    if (prevMove.category === lastMove.category) {
      const noCat = filtered.filter(m => m.category !== lastMove.category);
      if (noCat.length === 0) return [];
      filtered = noCat;
    }
  }

  // Constraint 2: No consecutive same move
  const noDup = filtered.filter(m => m.id !== lastMove.id);
  if (noDup.length > 0) filtered = noDup;

  // Constraint 3: No consecutive high-rotation (degrees >= 360)
  if (lastMove.mechanics.degrees >= 360) {
    const noSpin = filtered.filter(m => m.mechanics.degrees < 360);
    if (noSpin.length > 0) filtered = noSpin;
  }

  return filtered;
}

/**
 * Generates a combination of tricks based on physical state transitions.
 *
 * @param {number|null} [numTricks=null] - Number of tricks to generate.
 * @param {number} [maxStage=5] - Maximum skill stage to include.
 * @returns {object[]} A list of trick objects.
 */
export function generateCombo(numTricks = null, maxStage = 5) {
  if (numTricks === null) {
    numTricks = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  }

  if (numTricks <= 0) return [];

  const combo = [];
  const validMoves = MOVE_LIBRARY.moves.filter(m => m.stage <= maxStage);

  if (validMoves.length === 0) return [];

  // 1. Select the first trick
  let currentMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  let currentTrick = new Trick(currentMove.id);
  combo.push(currentTrick);

  // 2. Iteratively find compatible moves using two-tier matching
  for (let i = 0; i < numTricks - 1; i++) {
    // Tier 1 — strict: direction + point must both match the current exit state
    const strictCandidates = validMoves.filter(m =>
      m.entry.direction === currentTrick.exitDirection &&
      m.entry.point === currentTrick.exitPoint
    );

    // Tier 2 — relaxed: direction only (implicit edge/point shift between tricks)
    const relaxedCandidates = validMoves.filter(m =>
      m.entry.direction === currentTrick.exitDirection
    );

    if (relaxedCandidates.length === 0) break; // Should theoretically not happen with a complete library

    // Apply realism constraints to strict pool first, widen to relaxed if needed
    const strictFiltered = strictCandidates.length > 0 ? _applyRealismFilters(strictCandidates, combo) : [];
    const relaxedFiltered = _applyRealismFilters(relaxedCandidates, combo);

    let candidates;
    if (strictFiltered.length > 0) {
      candidates = strictFiltered;
    } else if (relaxedFiltered.length > 0) {
      candidates = relaxedFiltered;
    } else {
      candidates = relaxedCandidates;
    }

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map(t => t.toObject());
}
