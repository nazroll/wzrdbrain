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
      "id": "predator_one_f",
      "name": "Front Predator One",
      "category": "base",
      "stage": 1,
      "mechanics": { "feet": 1, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "predator_one_b",
      "name": "Back Predator One",
      "category": "base",
      "stage": 1,
      "mechanics": { "feet": 1, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "parallel_turn_o",
      "name": "Parallel Turn (Open)",
      "category": "turn",
      "stage": 2,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 90, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "parallel_turn_c",
      "name": "Parallel Turn (Closed)",
      "category": "turn",
      "stage": 2,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 90, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "tree_turn_o",
      "name": "Tree Turn (Open)",
      "category": "turn",
      "stage": 2,
      "mechanics": { "feet": 1, "is_rotation": false, "degrees": 90, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "tree_turn_c",
      "name": "Tree Turn (Closed)",
      "category": "turn",
      "stage": 2,
      "mechanics": { "feet": 1, "is_rotation": false, "degrees": 90, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "gazelle_f_o",
      "name": "Front Gazelle (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 },
      "metadata": { "description": "Front-to-back transition with a 3-turn shape. Leading foot on outside edge." }
    },
    {
      "id": "gazelle_f_c",
      "name": "Front Gazelle (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "gazelle_b_o",
      "name": "Back Gazelle (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "outside", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "gazelle_b_c",
      "name": "Back Gazelle (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "inside", "stance": "closed", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "gazelle_s_f_o",
      "name": "Front Gazelle S (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 },
      "metadata": { "aka": ["Inside Gazelle"] }
    },
    {
      "id": "gazelle_s_f_c",
      "name": "Front Gazelle S (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "gazelle_s_b_o",
      "name": "Back Gazelle S (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "outside", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "gazelle_s_b_c",
      "name": "Back Gazelle S (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "inside", "stance": "closed", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
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
      "id": "lion_f_c",
      "name": "Front Lion (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "lion_b_o",
      "name": "Back Lion (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "inside", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "lion_b_c",
      "name": "Back Lion (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "outside", "stance": "closed", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "lion_s_f_o",
      "name": "Front Lion S (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "inside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "lion_s_f_c",
      "name": "Front Lion S (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "lion_s_b_o",
      "name": "Back Lion S (Open)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "inside", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "lion_s_b_c",
      "name": "Back Lion S (Closed)",
      "category": "transition",
      "stage": 3,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "outside", "stance": "closed", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "opposite", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 1 }
    },
    {
      "id": "toe_pivot_f_o",
      "name": "Front Toe Pivot (Open)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "toe_pivot_f_c",
      "name": "Front Toe Pivot (Closed)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "closed", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "toe_pivot_b_o",
      "name": "Back Toe Pivot (Open)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "toe_pivot_b_c",
      "name": "Back Toe Pivot (Closed)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "closed", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "heel_pivot_f_o",
      "name": "Front Heel Pivot (Open)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "heel_pivot_f_c",
      "name": "Front Heel Pivot (Closed)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "closed", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "heel_pivot_b_o",
      "name": "Back Heel Pivot (Open)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "heel_pivot_b_c",
      "name": "Back Heel Pivot (Closed)",
      "category": "pivot",
      "stage": 4,
      "mechanics": { "feet": 1, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "closed", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "opposite", "feet": 1 }
    },
    {
      "id": "stunami_f",
      "name": "Front Stunami",
      "category": "swivel",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "opposite", "feet": 2 },
      "metadata": { "description": "Same-edge swivel. Stays on the same edge throughout the rotation." }
    },
    {
      "id": "stunami_b",
      "name": "Back Stunami",
      "category": "swivel",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "natural" },
      "entry": { "direction": "back", "edge": "outside", "stance": "open", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "opposite", "feet": 2 }
    },
    {
      "id": "ufo_swivel_f",
      "name": "Front UFO Swivel",
      "category": "swivel",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 360, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 },
      "metadata": { "description": "Same-edge swivel. Full 360 rotation on inside edges." }
    },
    {
      "id": "ufo_swivel_b",
      "name": "Back UFO Swivel",
      "category": "swivel",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 360, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "inside", "stance": "closed", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "toe_press_f",
      "name": "Front Toe Press",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "toe_press_b",
      "name": "Back Toe Press",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "heel_press_f",
      "name": "Front Heel Press",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "heel_press_b",
      "name": "Back Heel Press",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "toe_roll_f",
      "name": "Front Toe Roll",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "toe_roll_b",
      "name": "Back Toe Roll",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "heel_roll_f",
      "name": "Front Heel Roll",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "heel_roll_b",
      "name": "Back Heel Roll",
      "category": "manual",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "spin_180_f",
      "name": "Front 180",
      "category": "transition",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "spin_180_b",
      "name": "Back 180",
      "category": "transition",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 180, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "spin_360_f",
      "name": "Front 360",
      "category": "transition",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 360, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "spin_360_b",
      "name": "Back 360",
      "category": "transition",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 360, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "spin_540_f",
      "name": "Front 540",
      "category": "transition",
      "stage": 5,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 540, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "neutral", "point": "heel" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "toe", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "spin_540_b",
      "name": "Back 540",
      "category": "transition",
      "stage": 5,
      "mechanics": { "feet": 2, "is_rotation": true, "degrees": 540, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "neutral", "point": "toe" },
      "exit": { "direction": "opposite", "edge": "same", "stance": "same", "point": "heel", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "parallel_slide_f",
      "name": "Front Parallel Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "center", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "parallel_slide_b",
      "name": "Back Parallel Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "center", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "soul_slide_f",
      "name": "Front Soul Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "soul_slide_b",
      "name": "Back Soul Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "outside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "acid_slide_f",
      "name": "Front Acid Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "outside", "stance": "closed", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "acid_slide_b",
      "name": "Back Acid Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "outside", "stance": "closed", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "mizu_slide_f",
      "name": "Front Mizu Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "inside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "mizu_slide_b",
      "name": "Back Mizu Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "inside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "star_slide_f",
      "name": "Front Star Slide",
      "category": "slide",
      "stage": 5,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "inside", "stance": "closed", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "star_slide_b",
      "name": "Back Star Slide",
      "category": "slide",
      "stage": 5,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "inside", "stance": "closed", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "fast_slide_f",
      "name": "Front Fast Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "outside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "fast_slide_b",
      "name": "Back Fast Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "outside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "back_slide_f",
      "name": "Front Back Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "front", "edge": "inside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    },
    {
      "id": "back_slide_b",
      "name": "Back Back Slide",
      "category": "slide",
      "stage": 4,
      "mechanics": { "feet": 2, "is_rotation": false, "degrees": 0, "rotation_type": "neutral" },
      "entry": { "direction": "back", "edge": "inside", "stance": "open", "point": "all" },
      "exit": { "direction": "same", "edge": "same", "stance": "same", "point": "all", "lead_foot": "same", "feet": 2 }
    }
  ]
};

const MOVES = Object.fromEntries(MOVE_LIBRARY.moves.map(m => [m.id, m]));

/**
 * Represents a single trick with its resolved entry and exit states.
 * @class
 */
export class Trick {
  /**
   * @param {string} moveId - The unique identifier for the move.
   */
  constructor(moveId) {
    const move = MOVES[moveId];
    if (!move) throw new Error(`Invalid move ID: ${moveId}`);

    this.moveId = moveId;

    // Entry states are absolute in the library
    this.direction = move.entry.direction;
    this.edge = move.entry.edge;
    this.stance = move.entry.stance;
    this.point = move.entry.point;

    // Resolve Exit States
    this.exitDirection = this._resolveRelative(move.exit.direction, this.direction);
    this.exitEdge = this._resolveRelative(move.exit.edge, this.edge);
    this.exitStance = this._resolveRelative(move.exit.stance, this.stance);
    this.exitPoint = move.exit.point; // Point is always absolute
    this.exitLeadFoot = move.exit.lead_foot;
    this.exitFeet = move.exit.feet;
  }

  /**
   * Resolves relative state values (e.g., "same", "opposite").
   * @private
   * @param {string} value - The relative value to resolve.
   * @param {string} base - The base state to compare against.
   * @returns {string} The resolved absolute state value.
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
   * @returns {string} The name of the trick's move.
   */
  toString() {
    return MOVES[this.moveId].name;
  }

  /**
   * Returns a plain object representation of the trick.
   * @param {string} [transition="start"] - Describes how this trick links to the previous one.
   * @returns {object} A plain object with all trick properties.
   */
  toObject(transition = "start") {
    const move = MOVES[this.moveId];
    return {
      id: this.moveId,
      name: move.name,
      category: move.category,
      stage: move.stage,
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
 * @private
 * @param {object[]} candidates - Array of move objects to filter.
 * @param {Trick[]} combo - The sequence of tricks generated so far.
 * @param {boolean} [hardCategory=true] - If true, returns an empty list if category diversity can't be met.
 * @returns {object[]} A filtered list of candidate moves.
 */
function _applyRealismFilters(candidates, combo, hardCategory = true) {
  if (!candidates || candidates.length === 0 || !combo || combo.length === 0) {
    return candidates;
  }

  const lastMove = MOVES[combo[combo.length - 1].moveId];
  let filtered = candidates;

  // Constraint 1: Max 2 consecutive same category (general)
  if (combo.length >= 2) {
    const prevCategory = MOVES[combo[combo.length - 2].moveId].category;
    if (prevCategory === lastMove.category && lastMove.category !== "slide") {
      const noCat = filtered.filter(m => m.category !== lastMove.category);
      if (noCat.length === 0 && hardCategory) {
        return [];
      }
      if (noCat.length > 0) {
        filtered = noCat;
      }
    }
  }

  // Constraint 1b: Specific slide probability
  if (lastMove.category === "slide") {
    // Hard cap at 2 slides
    if (combo.length >= 2 && MOVES[combo[combo.length - 2].moveId].category === "slide") {
      const noSlide = filtered.filter(m => m.category !== "slide");
      return noSlide.length > 0 ? noSlide : []; // Absolute cap
    } else {
      // 10% chance to allow a second consecutive slide
      if (Math.random() > 0.10) {
        const noSlide = filtered.filter(m => m.category !== "slide");
        if (noSlide.length === 0 && hardCategory) {
          return [];
        }
        if (noSlide.length > 0) {
          filtered = noSlide;
        }
      }
    }
  }

  // Constraint 2: No consecutive same move
  const noDup = filtered.filter(m => m.id !== lastMove.id);
  if (noDup.length > 0) {
    filtered = noDup;
  }

  // Constraint 3: No consecutive high-rotation (degrees >= 360)
  if (lastMove.mechanics.degrees >= 360) {
    const noSpin = filtered.filter(m => m.mechanics.degrees < 360);
    if (noSpin.length > 0) {
      filtered = noSpin;
    }
  }

  return filtered;
}

/**
 * Classifies how physically continuous the link from a previous trick's
 * exit state to the next move's entry requirements is.
 * @private
 * @param {Trick} prev - The previous trick instance.
 * @param {object} nxt - The next move object from the library.
 * @returns {string} The transition type: "linked", "edge_shift", or "reset".
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
 * Candidate selection uses a three-tier cascade to prefer full physical
 * continuity but widens the search to prevent dead-ends.
 * @param {number|null} [numTricks=null] - Number of tricks to generate (defaults to 2-5).
 * @param {number} [maxStage=5] - Maximum skill stage to include.
 * @returns {object[]} An array of trick objects forming the combo.
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

  // 1. Select the first trick
  const validMoves = MOVE_LIBRARY.moves.filter(m => m.stage <= maxStage);
  if (validMoves.length === 0) {
    return [];
  }
  const firstMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  let currentTrick = new Trick(firstMove.id);
  combo.push(currentTrick);

  // 2. Iteratively find compatible moves
  for (let i = 0; i < numTricks - 1; i++) {
    const eligible = validMoves;
    const sameDirection = eligible.filter(m => m.entry.direction === currentTrick.exitDirection);

    // Tier 1 (strict): direction + point + edge + stance match exit state.
    const strict = sameDirection.filter(m =>
      m.entry.point === currentTrick.exitPoint &&
      m.entry.edge === currentTrick.exitEdge &&
      m.entry.stance === currentTrick.exitStance
    );

    // Tier 2 (mid): direction + point match.
    const mid = sameDirection.filter(m => m.entry.point === currentTrick.exitPoint);

    // Tier 3 (relaxed): direction only.
    const relaxed = sameDirection;

    // Apply realism constraints to narrowest pool first, widening as needed.
    let candidates = [];
    let foundCandidates = false;
    const lastId = currentTrick.moveId;

    for (const pool of [strict, mid, relaxed]) {
      if (pool.length > 0) {
        const filtered = _applyRealismFilters(pool, combo, true);
        const nonDup = filtered.filter(m => m.id !== lastId);
        if (nonDup.length > 0) {
          candidates = nonDup;
          foundCandidates = true;
          break;
        }
      }
    }

    if (!foundCandidates) {
      // Every hard-category pool was empty; relax the category constraint.
      const filtered = _applyRealismFilters(relaxed, combo, false);
      const nonDup = filtered.filter(m => m.id !== lastId);
      candidates = nonDup.length > 0 ? nonDup : filtered;
    }

    if (candidates.length === 0) {
      // Absolute worst-case fallback.
      const nonDup = relaxed.filter(m => m.id !== lastId);
      candidates = nonDup.length > 0 ? nonDup : relaxed;
      // Re-apply the absolute 2-slide hard cap even in the worst case.
      if (
        combo.length >= 2 &&
        MOVES[combo[combo.length - 1].moveId].category === "slide" &&
        MOVES[combo[combo.length - 2].moveId].category === "slide"
      ) {
        candidates = candidates.filter(m => m.category !== "slide");
      }
    }

    if (candidates.length === 0) {
      // No physically valid continuation exists; return the partial combo.
      break;
    }

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    transitions.push(_transitionType(currentTrick, nextMove));
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map((t, idx) => t.toObject(transitions[idx]));
}