/**
 * @author Nazrul Kamaruddin
 * @license Apache-2.0
 */

// Move library from moves.json, embedded directly as a constant
const MOVE_LIBRARY = {
  "version": "1.0.0",
  "moves": [
    {
      "id": "predator_f_o",
      "name": "Front Predator (Open)",
      "category": "base",
      "stage": 1,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "open", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "predator_b_o",
      "name": "Back Predator (Open)",
      "category": "base",
      "stage": 1,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "open", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "parallel_turn_o",
      "name": "Parallel Turn (Outside)",
      "category": "turn",
      "stage": 2,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 90, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "tree_turn_o",
      "name": "Tree Turn (Outside)",
      "category": "turn",
      "stage": 2,
      "mechanics": { "feet": 1, "is_rotation": false, "degrees": 90, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "gazelle_f_o",
      "name": "Front Gazelle (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 },
      "metadata": { "description": "Front-to-back transition with a 3-turn shape." }
    },
    {
      "id": "lion_f_o",
      "name": "Front Lion (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "gazelle_s_f_o",
      "name": "Front Gazelle S (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 },
      "metadata": { "aka": ["Inside Gazelle"] }
    },
    {
      "id": "toe_pivot",
      "name": "Toe Pivot",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "heel_pivot",
      "name": "Heel Pivot",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "stunami_f",
      "name": "Front Stunami",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 2 }
    },
    {
      "id": "ufo_swivel",
      "name": "UFO Swivel",
      "category": "transition",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 360, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    }
  ]
};

const MOVES = Object.fromEntries(MOVE_LIBRARY.moves.map(m => [m.id, m]));

/**
 * Represents a single trick instance.
 * It resolves the absolute entry and exit states based on a move's definition.
 */
export class Trick {
  /**
   * Creates an instance of a Trick.
   * @param {string} moveId - The unique identifier for the move from the move library.
   */
  constructor(moveId) {
    const move = MOVES[moveId];
    if (!move) {
      throw new Error(`Invalid move ID: ${moveId}`);
    }

    this.moveId = moveId;
    this.name = move.name;
    this.category = move.category;
    this.stage = move.stage;

    // Entry states are absolute in the library
    this.direction = move.entry.direction;
    this.edge = move.entry.edge;
    this.stance = move.entry.stance;
    this.point = move.entry.point;

    // Resolve Exit States from relative definitions
    this.exitDirection = this._resolveRelative(move.exit.direction, this.direction);
    this.exitEdge = this._resolveRelative(move.exit.edge, this.edge);
    this.exitStance = this._resolveRelative(move.exit.stance, this.stance);
    this.exitPoint = move.exit.point; // Point is always absolute
  }

  /**
   * Resolves relative state values like "same" or "opposite" into absolute states.
   * @private
   * @param {string} value - The state value to resolve (e.g., "same", "opposite", "front").
   * @param {string} base - The base state value to compare against (e.g., "front").
   * @returns {string} The resolved, absolute state value.
   */
  _resolveRelative(value, base) {
    if (value === "same") {
      return base;
    }
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
   * Returns the human-readable name of the trick.
   * @returns {string} The name of the trick.
   */
  toString() {
    return this.name;
  }

  /**
   * Returns a plain object representation of the trick with its resolved states.
   * @returns {object} A serializable object representing the trick.
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
 * It chains tricks together by matching the exit state of one trick to the
 * entry state of the next, focusing on Direction and Weight Point for continuity.
 *
 * @param {number|null} [numTricks=null] - The desired number of tricks in the combo. If null, a random number between 2 and 5 is chosen.
 * @param {number} [maxStage=5] - The maximum skill stage of moves to include in the combo.
 * @returns {object[]} An array of trick objects representing the generated combo.
 */
export function generateCombo(numTricks = null, maxStage = 5) {
  if (numTricks === null) {
    numTricks = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  }

  if (numTricks <= 0) {
    return [];
  }

  const combo = [];

  // 1. Select the first trick
  const validStartMoves = MOVE_LIBRARY.moves.filter(m => m.stage <= maxStage);
  if (validStartMoves.length === 0) {
    return [];
  }
  
  const firstMove = validStartMoves[Math.floor(Math.random() * validStartMoves.length)];
  let currentTrick = new Trick(firstMove.id);
  combo.push(currentTrick);

  // 2. Iteratively find compatible moves
  for (let i = 0; i < numTricks - 1; i++) {
    // A move is compatible if its entry Direction and Point match the current exit state.
    const candidates = MOVE_LIBRARY.moves.filter(move => {
      if (move.stage > maxStage) {
        return false;
      }
      return (
        move.entry.direction === currentTrick.exitDirection &&
        move.entry.point === currentTrick.exitPoint
      );
    });

    if (candidates.length === 0) {
      break; // End combo if no physically compatible move is found
    }

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map(t => t.toObject());
}