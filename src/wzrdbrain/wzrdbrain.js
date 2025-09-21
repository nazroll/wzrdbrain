/**
 * @author Nazrul Kamaruddin
 * @license Apache-2.0
 */

// Data from tricks.json, embedded directly as constants
const DIRECTIONS = ["front", "back"];
const STANCES = ["open", "closed"];
const MOVES = [
  "predator", "predator one", "parallel", "tree", "gazelle", "gazelle s",
  "lion", "lion s", "toe press", "heel press", "toe roll", "heel roll",
  "360", "180", "540", "parallel slide", "soul slide", "acid slide",
  "mizu slide", "star slide", "fast slide", "back slide", "stunami",
  "ufo swivel", "toe pivot", "heel pivot"
];

// Rules converted to Set for efficient lookups, mirroring Python's set usage
/** @type {Set<string>} */
const onlyFirst = new Set(["predator", "predator one", "parallel"]);
/** @type {Set<string>} */
const useFakie = new Set([
  "toe press", "toe roll", "heel press", "heel roll", "360", "180", "540",
  "parallel slide", "soul slide", "acid slide", "mizu slide", "star slide",
  "fast slide", "back slide"
]);
/** @type {Set<string>} */
const excludeStanceBase = new Set(["predator", "predator one"]);
/** @type {Set<string>} */
const rotatingMoves = new Set(["gazelle", "lion", "180", "540", "stunami", "ufo swivel"]);


// Derived rules, mirroring Python's `exclude_stance` and `SUBSEQUENT_MOVES`
/**
 * A set of moves that exclude an automatically determined stance.
 * This is the union of EXCLUDE_STANCE_BASE and USE_FAKIE from the JSON rules,
 * directly translating Python's `exclude_stance_base.union(use_fakie)`.
 * @type {Set<string>}
 */
const excludeStance = new Set([...excludeStanceBase, ...useFakie]);

/**
 * An array of moves that are valid for subsequent tricks (i.e., not "ONLY_FIRST").
 * This is pre-calculated for efficiency, directly translating Python's `set(MOVES) - only_first`.
 * @type {string[]}
 */
const subsequentMoves = MOVES.filter(move => !onlyFirst.has(move));


/**
 * @typedef {'front' | 'back'} Direction
 * @typedef {'open' | 'closed'} Stance
 * @typedef {string} Move
 */

/**
 * Represents a single trick with its direction, stance, and move.
 * Automatically generates random values for unspecified properties
 * and adjusts properties like exit direction based on the move,
 * directly translating the Python `Trick` dataclass logic, especially its `__post_init__` method.
 */
export class Trick {
  /** @type {Direction | null} */
  direction;
  /** @type {Stance | null} */
  stance;
  /** @type {Move | null} */
  move;
  /** @type {Direction | null} */
  enterIntoTrick;
  /** @type {Direction | null} */
  exitFromTrick;

  /**
   * Creates an instance of Trick. Unspecified properties will be randomly generated.
   * This constructor's logic directly translates the Python `__post_init__` method.
   *
   * @param {object} [props] - Optional properties for the trick.
   * @param {Direction | null} [props.direction=null] - The direction (e.g., 'front', 'back').
   * @param {Stance | null} [props.stance=null] - The stance (e.g., 'open', 'closed').
   * @param {Move | null} [props.move=null] - The specific trick move.
   * @param {Direction | null} [props.enterIntoTrick=null] - The direction from which the trick is entered.
   * @param {Direction | null} [props.exitFromTrick=null] - The direction into which the trick exits.
   * @throws {Error} If an invalid direction, stance, or move is provided.
   */
  constructor({
    direction = null,
    stance = null,
    move = null,
    enterIntoTrick = null,
    exitFromTrick = null,
  } = {}) {
    // 1. Input validation, mirroring Python's `__post_init__` validation
    if (direction !== null && !DIRECTIONS.includes(direction)) {
      throw new Error(`Invalid direction: '${direction}'. Must be one of ${DIRECTIONS.join(', ')}`);
    }
    if (stance !== null && !STANCES.includes(stance)) {
      throw new Error(`Invalid stance: '${stance}'. Must be one of ${STANCES.join(', ')}`);
    }
    if (move !== null && !MOVES.includes(move)) {
      throw new Error(`Invalid move: '${move}'. Must be one of ${MOVES.join(', ')}`);
    }

    // 2. Assign initial values
    this.direction = direction;
    this.stance = stance;
    this.move = move;
    this.enterIntoTrick = enterIntoTrick;
    this.exitFromTrick = exitFromTrick;

    // 3. Generate default values if not provided, mirroring Python's `__post_init__`
    if (this.direction === null) {
      this.direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    }

    if (this.move === null) {
      this.move = MOVES[Math.floor(Math.random() * MOVES.length)];
    }

    if (this.enterIntoTrick === null) {
      this.enterIntoTrick = this.direction;
    }

    if (this.exitFromTrick === null) {
      this.exitFromTrick = this.direction;
    }

    // 4. Automatically determine stance if not provided and not excluded by move
    if (this.stance === null && this.move !== null && !excludeStance.has(this.move)) {
      this.stance = STANCES[Math.floor(Math.random() * STANCES.length)];
    }

    // 5. Update exit direction for moves that rotate the body
    if (this.move !== null && rotatingMoves.has(this.move)) {
      if (this.direction === "back") {
        this.exitFromTrick = "front";
      } else if (this.direction === "front") {
        this.exitFromTrick = "back";
      }
    }
  }

  /**
   * Returns a human-readable string representation of the trick,
   * directly translating the Python `__str__` method.
   * This handles "fakie" / "forward" display names for relevant moves.
   * @returns {string} The formatted name of the trick.
   */
  getName() {
    const parts = [];
    let displayDirection = this.direction;

    // Handle fakie/forward display name, mirroring Python's `__str__`
    if (this.move !== null && useFakie.has(this.move)) {
      if (this.direction === "back") {
        displayDirection = "fakie";
      } else if (this.direction === "front") {
        displayDirection = "forward";
      }
    }

    if (displayDirection) {
      parts.push(displayDirection);
    }
    if (this.stance) {
      parts.push(this.stance);
    }
    if (this.move) {
      parts.push(this.move);
    }

    return parts.join(" ");
  }

  /**
   * Returns a plain JavaScript object representation of the trick,
   * including all its properties and its full display name,
   * directly translating the Python `to_dict` method.
   * @returns {object} An object containing the trick's properties and its name.
   */
  toObject() {
    return {
      direction: this.direction,
      stance: this.stance,
      move: this.move,
      enterIntoTrick: this.enterIntoTrick,
      exitFromTrick: this.exitFromTrick,
      name: this.getName(),
    };
  }
}

/**
 * Generates a combination (combo) of tricks,
 * directly translating the Python `generate_combo` function.
 *
 * @param {number | null} [numTricks=null] - The number of tricks to generate in the combo.
 *   If null, a random number between 2 and 5 (inclusive) will be chosen, mirroring Python's `random.randint(2, 5)`.
 * @returns {object[]} A list of trick objects, each with their properties and a 'name' field.
 *   Returns an empty array if numTricks is 0 or less.
 */
export function generateCombo(numTricks = null) {
  // Mirroring Python's default num_of_tricks = random.randint(2, 5)
  if (numTricks === null) {
    numTricks = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  }

  if (numTricks <= 0) {
    return [];
  }

  /** @type {Trick[]} */
  const trickObjects = [];
  /** @type {Trick | null} */
  let previousTrick = null;

  for (let i = 0; i < numTricks; i++) {
    /** @type {Trick} */
    let newTrick;

    if (i === 0) {
      // First trick: choose from all moves, mirroring Python's logic
      const move = MOVES[Math.floor(Math.random() * MOVES.length)];
      newTrick = new Trick({ move });
    } else {
      // Subsequent tricks: respect exit direction of previous trick
      // and choose from moves not marked as ONLY_FIRST.
      if (!previousTrick) {
        // This case should ideally not be reached, mirroring Python's `assert`
        throw new Error("Previous trick is undefined for subsequent trick generation.");
      }
      const requiredDirection = previousTrick.exitFromTrick;
      // Choose from the pre-filtered array of subsequent moves for efficiency
      const move = subsequentMoves[Math.floor(Math.random() * subsequentMoves.length)];
      newTrick = new Trick({
        direction: requiredDirection,
        move
      });
    }

    trickObjects.push(newTrick);
    previousTrick = newTrick;
  }

  // Mirroring Python's `[trick.to_dict() for trick in trick_objects]`
  return trickObjects.map(trick => trick.toObject());
}