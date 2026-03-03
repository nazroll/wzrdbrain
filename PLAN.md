# WzrdBrain SLM Plan

## Context

wzrdbrain generates wizard skating trick combos procedurally (26 moves, 4 rule categories, direction-linked combos). The goal is to create a Small Language Model that can **generate valid combos**, act as a **natural language interface** ("give me a 3-trick combo with a gazelle"), and **embed domain knowledge** (explain tricks, suggest learning progressions). Deployed to **Hugging Face** (model + Space demo).

---

## 1. Base Model

**Qwen 2.5 1.5B Instruct** — good instruction-following at small size, Apache 2.0 license, native HF support. Fallback to Gemma 2 2B if rule compliance is poor, or Qwen 2.5 0.5B if smaller is needed.

## 2. Project Structure

New `slm/` directory (independent from core library):

```
slm/
├── requirements.txt          # torch, transformers, trl, unsloth, peft, etc.
├── config.yaml               # Hyperparameters, model selection
├── generate_data.py          # Synthetic training data generation
├── train.py                  # QLoRA fine-tuning (Unsloth + TRL)
├── evaluate.py               # Rule compliance + quality evaluation
├── push_to_hub.py            # Merge LoRA + push to HF Hub
├── knowledge/
│   ├── trick_descriptions.json    # Hand-written descriptions for 26 moves
│   └── learning_progressions.json # Difficulty tiers
├── data/                     # Generated data (gitignored)
│   ├── train.jsonl
│   ├── val.jsonl
│   └── test.jsonl
└── space/                    # HF Space demo
    ├── app.py
    └── requirements.txt
```

## 3. Synthetic Training Data (~9,000 examples)

Generate from the library itself — every combo is **validated** before inclusion.

| Category | Count | Method |
|---|---|---|
| A. Simple combo generation | 5,000 | Call `generate_combo(n)`, format as chat pairs with 20+ prompt templates |
| B. Constrained generation | 3,000 | Construct first trick directly via `Trick(move=X)`, then generate rest with direction linking |
| C. Trick explanations | 500 | Template-based from `trick_descriptions.json` + auto-derived rule metadata |
| D. Rule explanations | 300 | Hand-written + template expansion (why ONLY_FIRST, how rotating works, etc.) |
| E. Learning progressions | 200 | Curated difficulty tiers expanded into prompt/response variations |

**Format**: HF chat format (system/user/assistant messages in JSONL), 90/10 train/val split + 200 held-out test.

**System prompt**: "You are WzrdBrain, an expert wizard skating trick combo generator..."

## 4. Fine-Tuning

- **Method**: QLoRA (4-bit quantized base, LoRA r=16, alpha=32)
- **Framework**: Unsloth + TRL `SFTTrainer`
- **Key params**: 3 epochs, lr=2e-4, cosine schedule, max_seq_length=1024, effective batch size=16
- **Hardware**: Single GPU (A100 ~1-2h, T4 ~4-6h, or Colab free tier)

## 5. Evaluation

Automated rule compliance checks (the critical metric):
- **Direction linking**: trick[i].exit == trick[i+1].enter (target >98%)
- **ONLY_FIRST rule**: no predator/predator one/parallel after first trick (target >99%)
- **Valid moves only**: no hallucinated move names (target >99%)
- **Parseable output**: model produces expected numbered-list format (target >95%)

Plus: perplexity on validation set, manual spot-check of 50 explanation responses.

## 6. Deployment

1. Merge LoRA into base model
2. Push to `nazroll/wzrdbrain-slm` on HF Hub with model card
3. Export GGUF variants (Q4_K_M, Q8_0) for local inference
4. Deploy Gradio chat demo to HF Spaces (`nazroll/wzrdbrain-slm-demo`)

## 7. Implementation Order

| Phase | Work | Key Files |
|---|---|---|
| 1. Knowledge curation | Write trick descriptions + learning progressions | `slm/knowledge/*.json` |
| 2. Data generation | Build `generate_data.py`, generate ~9k validated examples | `slm/generate_data.py` |
| 3. Training | Build `train.py`, run QLoRA fine-tuning | `slm/train.py`, `slm/config.yaml` |
| 4. Evaluation | Build `evaluate.py`, measure rule compliance | `slm/evaluate.py` |
| 5. Deployment | Merge, push to Hub, build Space demo | `slm/push_to_hub.py`, `slm/space/app.py` |

## 8. Critical Existing Files

- `src/wzrdbrain/wzrdbrain.py` — import directly for data generation (Trick class, generate_combo, rule sets)
- `src/wzrdbrain/tricks.json` — source of truth for all moves/rules
- `tests/test_wzrdbrain.py` — pattern for rule compliance validation

## Verification

- Run `generate_data.py` and inspect samples manually
- Run `train.py` and confirm loss decreases across epochs
- Run `evaluate.py` and confirm all compliance targets are met
- Test the HF Space demo with varied prompts (simple combos, constrained requests, trick explanations)
