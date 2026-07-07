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
    // lead_foot is a relative token (same/opposite) telling the skater whether the
    // guiding foot switches; feet (1 or 2) is absolute. Both are surfaced in toObject.
    this.exitLeadFoot = move.exit.lead_foot;
    this.exitFeet = move.exit.feet;
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
   * @param {string} [transition="start"] - How this trick links to the previous one.
   * @returns {object} Plain object representation of the trick.
   */
  toObject(transition = "start") {
    return {
      id: this.moveId,
      name: this.name,
      category: this.category,
      stage: this.stage,
      transition: transition,
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
        lead_foot: this.exitLeadFoot,
        feet: this.exitFeet,
      },
    };
  }
}

/**
 * Applies realism constraints to candidate moves.
 * If hardCategory is true and category diversity cannot be satisfied,
 * returns an empty array to signal the caller to try a wider candidate pool.
 * If hardCategory is false, applies other constraints even if the category repeats.
 * @private
 * @param {object[]} candidates - Array of move objects.
 * @param {Trick[]} combo - Tricks selected so far.
 * @param {boolean} [hardCategory=true] - Whether to enforce strict category diversity.
 * @returns {object[]} Filtered candidates.
 */
function _applyRealismFilters(candidates, combo, hardCategory = true) {
  if (candidates.length === 0 || combo.length === 0) return candidates;

  const lastMove = MOVES[combo[combo.length - 1].moveId];
  let filtered = candidates;

  // Constraint 1: Max 2 consecutive same category (general, excludes slides)
  if (combo.length >= 2) {
    const prevMove = MOVES[combo[combo.length - 2].moveId];
    if (prevMove.category === lastMove.category && lastMove.category !== "slide") {
      const noCat = filtered.filter(m => m.category !== lastMove.category);
      if (noCat.length === 0 && hardCategory) return [];
      if (noCat.length > 0) filtered = noCat;
    }
  }

  // Constraint 1b: Specific slide probability
  if (lastMove.category === "slide") {
    // Hard cap at 2 consecutive slides (absolute, ignores hardCategory flag)
    if (combo.length >= 2 && MOVES[combo[combo.length - 2].moveId].category === "slide") {
      const noSlide = filtered.filter(m => m.category !== "slide");
      return noSlide.length > 0 ? noSlide : [];
    } else {
      // 10% chance to allow a second consecutive slide
      if (Math.random() > 0.10) {
        const noSlide = filtered.filter(m => m.category !== "slide");
        if (noSlide.length === 0 && hardCategory) return [];
        if (noSlide.length > 0) filtered = noSlide;
      }
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
 * Classifies how physically continuous the link from prev (exit state) into
 * nxt (entry requirements) is.
 * @private
 * @param {Trick} prev - The previous trick.
 * @param {object} nxt - The next move object.
 * @returns {string} The transition type ("linked", "edge_shift", or "reset").
 */
function _transitionType(prev, nxt) {
  const edgeOk = nxt.entry.edge === prev.exitEdge;
  const stanceOk = nxt.entry.stance === prev.exitStance;
  const pointOk = nxt.entry.point === prev.exitPoint;

  if (edgeOk && stanceOk && pointOk) {
    return "linked";
  }
  if (pointOk) {
    return "edge_shift";
  }
  return "reset";
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

  if (numTricks <= 0) {
    return [];
  }

  const combo = [];
  const transitions = ["start"];
  const validMoves = MOVE_LIBRARY.moves.filter(m => m.stage <= maxStage);

  if (validMoves.length === 0) {
    return [];
  }

  // 1. Select the first trick
  const firstMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  let currentTrick = new Trick(firstMove.id);
  combo.push(currentTrick);

  // 2. Iteratively find compatible moves using the three-tier cascade
  for (let i = 0; i < numTricks - 1; i++) {
    const eligible = validMoves;

    // All tiers preserve direction (the one hard physical invariant).
    const sameDirection = eligible.filter(m => m.entry.direction === currentTrick.exitDirection);

    // Tier 1 — strict: direction + point + edge + stance all match the exit state.
    const strict = sameDirection.filter(m =>
      m.entry.point === currentTrick.exitPoint &&
      m.entry.edge === currentTrick.exitEdge &&
      m.entry.stance === currentTrick.exitStance
    );

    // Tier 2 — mid: direction + point match (edge/stance re-set between tricks).
    const mid = sameDirection.filter(m => m.entry.point === currentTrick.exitPoint);

    // Tier 3 — relaxed: direction only (weight point also re-set).
    const relaxed = sameDirection;

    // Apply realism constraints to the narrowest pool first, widening as needed.
    // A tier is only accepted if it offers a move other than an immediate repeat;
    // otherwise we widen so a single same-move survivor never forces a duplicate.
    const lastId = currentTrick.moveId;
    let candidates = [];

    for (const pool of [strict, mid, relaxed]) {
      const filtered = pool.length > 0 ? _applyRealismFilters(pool, combo, true) : [];
      const nonDup = filtered.filter(m => m.id !== lastId);
      if (nonDup.length > 0) {
        candidates = nonDup;
        break;
      }
    }

    if (candidates.length === 0) {
      // Every hard-category pool came up empty; relax the category constraint.
      const filtered = _applyRealismFilters(relaxed, combo, false);
      const nonDup = filtered.filter(m => m.id !== lastId);
      candidates = nonDup.length > 0 ? nonDup : filtered;
    }

    if (candidates.length === 0) {
      // Absolute worst-case fallback, should rarely be hit given the library size.
      const nonDup = relaxed.filter(m => m.id !== lastId);
      candidates = nonDup.length > 0 ? nonDup : relaxed;
    }

    if (candidates.length === 0) {
      // No physically valid continuation exists; return the partial combo
      break;
    }

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    transitions.push(_transitionType(currentTrick, nextMove));
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map((t, idx) => t.toObject(transitions[idx]));
}
