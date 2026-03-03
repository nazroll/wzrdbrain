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

// Create a lookup map for efficient access by move ID
const MOVES = Object.fromEntries(MOVE_LIBRARY.moves.map(m => [m.id, m]));

/**
 * Represents a single trick with its resolved entry and exit states.
 * This class translates a move from the library into a concrete instance
 * within a sequence, resolving relative state changes.
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

    // Resolve Exit States based on entry state
    this.exitDirection = this._resolveRelative(move.exit.direction, this.direction);
    this.exitEdge = this._resolveRelative(move.exit.edge, this.edge);
    this.exitStance = this._resolveRelative(move.exit.stance, this.stance);
    this.exitPoint = move.exit.point; // Point is always absolute, not relative
  }

  /**
   * Resolves relative state values like "same" or "opposite" to absolute values.
   * @private
   * @param {string} value - The state value from the move definition (e.g., "same", "opposite", "front").
   * @param {string} base - The corresponding entry state value to compare against.
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
   * @returns {string} The name of the trick's move.
   */
  toString() {
    return MOVES[this.moveId].name;
  }

  /**
   * Returns a plain object representation of the trick instance.
   * @returns {{id: string, name: string, category: string, stage: number, entry: object, exit: object}} Plain object representation of the trick.
   */
  toObject() {
    const move = MOVES[this.moveId];
    return {
      id: this.moveId,
      name: move.name,
      category: move.category,
      stage: move.stage,
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
 * It ensures that the entry state of a trick is compatible with the exit
 * state of the preceding trick.
 *
 * @param {number|null} [numTricks=null] - Number of tricks to generate. Defaults to a random number between 2 and 5.
 * @param {number} [maxStage=5] - Maximum skill stage of moves to include.
 * @returns {object[]} An array of trick objects representing the generated combo.
 */
export function generateCombo(numTricks = null, maxStage = 5) {
  if (numTricks === null) {
    numTricks = Math.floor(Math.random() * (5 - 2 + 1)) + 2; // Random int between 2 and 5
  }

  if (numTricks <= 0) {
    return [];
  }

  const combo = [];
  const validMoves = MOVE_LIBRARY.moves.filter(m => m.stage <= maxStage);

  if (validMoves.length === 0) {
    return [];
  }

  // 1. Select the first trick from all valid moves
  const firstMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  let currentTrick = new Trick(firstMove.id);
  combo.push(currentTrick);

  // 2. Iteratively find compatible subsequent moves
  for (let i = 0; i < numTricks - 1; i++) {
    // Tier 1 — Strict match: Direction AND Weight Point must both match the current exit state.
    const strictCandidates = validMoves.filter(m =>
      m.entry.direction === currentTrick.exitDirection &&
      m.entry.point === currentTrick.exitPoint
    );

    // Tier 2 — Relaxed match: Only Direction must match (implies an implicit shift of weight point).
    const relaxedCandidates = validMoves.filter(m =>
      m.entry.direction === currentTrick.exitDirection
    );

    const candidates = strictCandidates.length > 0 ? strictCandidates : relaxedCandidates;

    if (candidates.length === 0) {
      break; // No compatible moves found, end combo generation.
    }

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map(t => t.toObject());
}