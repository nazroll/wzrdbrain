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

  // 2. Iteratively find compatible moves
  for (let i = 0; i < numTricks - 1; i++) {
    const candidates = validMoves.filter(m => 
      m.entry.direction === currentTrick.exitDirection &&
      m.entry.point === currentTrick.exitPoint
    );

    if (candidates.length === 0) break;

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map(t => t.toObject());
}
