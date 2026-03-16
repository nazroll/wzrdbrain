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
 * This class translates the relative states (e.g., "same", "opposite")
 * from the move library into absolute states for a specific instance of a trick.
 */
export class Trick {
  /**
   * @param {string} moveId - The unique identifier for the move from the MOVE_LIBRARY.
   */
  constructor(moveId) {
    const move = MOVES[moveId];
    if (!move) throw new Error(`Invalid move ID: ${moveId}`);

    this.moveId = moveId;
    this.name = move.name;
    this.category = move.category;
    this.stage = move.stage;

    // Entry states are absolute in the library
    this.direction = move.entry.direction;
    this.edge = move.entry.edge;
    this.stance = move.entry.stance;
    this.point = move.entry.point;

    // Resolve Exit States based on the entry states
    this.exitDirection = this._resolveRelative(move.exit.direction, this.direction);
    this.exitEdge = this._resolveRelative(move.exit.edge, this.edge);
    this.exitStance = this._resolveRelative(move.exit.stance, this.stance);
    this.exitPoint = move.exit.point; // Point is always absolute
  }

  /**
   * Resolves relative state values like "same" or "opposite" into absolute states.
   * @private
   * @param {string} value - The relative state value (e.g., "same", "opposite", "front").
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
   * @returns {string} The human-readable name of the trick.
   */
  toString() {
    return this.name;
  }

  /**
   * @returns {object} A plain object representation of the trick with resolved states.
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
 * Applies realism constraints to a list of candidate moves.
 * If hardCategory is true and category diversity cannot be satisfied,
 * returns an empty array to signal the caller to try a wider candidate pool.
 * If hardCategory is false, it applies other constraints even if the category repeats.
 * @private
 * @param {object[]} candidates - An array of move objects to be filtered.
 * @param {Trick[]} combo - The list of tricks already selected in the current combo.
 * @param {boolean} [hardCategory=true] - Whether to strictly enforce category diversity rules.
 * @returns {object[]} The filtered list of candidate moves.
 */
function _applyRealismFilters(candidates, combo, hardCategory = true) {
  if (candidates.length === 0 || combo.length === 0) {
    return candidates;
  }

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
      // Absolute hard cap, never soft-fallback back into slides
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
 * Generates a combination of tricks based on physical state transitions,
 * ensuring that the exit state of one trick is a valid entry state for the next.
 *
 * @param {number|null} [numTricks=null] - The desired number of tricks in the combo. If null, a random length between 2 and 5 is chosen.
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
  const validMoves = MOVE_LIBRARY.moves.filter(m => m.stage <= maxStage);

  if (validMoves.length === 0) {
    return [];
  }

  // 1. Select the first trick randomly from all valid moves.
  let firstMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  let currentTrick = new Trick(firstMove.id);
  combo.push(currentTrick);

  // 2. Iteratively find compatible moves using two-tier matching.
  for (let i = 0; i < numTricks - 1; i++) {
    // Tier 1 — strict: entry direction + point must both match the current exit state.
    const strictCandidates = validMoves.filter(m =>
      m.entry.direction === currentTrick.exitDirection &&
      m.entry.point === currentTrick.exitPoint
    );

    // Tier 2 — relaxed: only direction must match (allowing for implicit edge/point shifts).
    const relaxedCandidates = validMoves.filter(m =>
      m.entry.direction === currentTrick.exitDirection
    );

    if (relaxedCandidates.length === 0) {
        // This should not happen with a comprehensive move library, but serves as a failsafe.
        break;
    }

    // Apply realism constraints with a tiered fallback system.
    const strictFiltered = strictCandidates.length > 0 ? _applyRealismFilters(strictCandidates, combo, true) : [];
    const relaxedFiltered = _applyRealismFilters(relaxedCandidates, combo, true);

    let candidates;
    if (strictFiltered.length > 0) {
      candidates = strictFiltered;
    } else if (relaxedFiltered.length > 0) {
      candidates = relaxedFiltered;
    } else {
      // Soft fallback: relax category enforcement but keep other constraints.
      candidates = _applyRealismFilters(relaxedCandidates, combo, false);
    }

    if (candidates.length === 0) {
      // Absolute worst-case fallback: use any move that matches direction.
      candidates = relaxedCandidates;
      if (candidates.length === 0) break;
    }

    const nextMove = candidates[Math.floor(Math.random() * candidates.length)];
    currentTrick = new Trick(nextMove.id);
    combo.push(currentTrick);
  }

  return combo.map(t => t.toObject());
}