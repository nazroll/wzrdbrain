"""
Push the trained WzrdBrain SLM to Hugging Face Hub.

Merges LoRA adapters into the base model and pushes to HF Hub
with a model card. Optionally exports GGUF variants.

Usage:
    python slm/push_to_hub.py --model-path slm/outputs/wzrdbrain-slm/lora
    python slm/push_to_hub.py --model-path slm/outputs/wzrdbrain-slm/lora --gguf
"""

import argparse
from pathlib import Path

import yaml

SLM_DIR = Path(__file__).resolve().parent

with open(SLM_DIR / "config.yaml") as f:
    CONFIG = yaml.safe_load(f)

MODEL_CARD_TEMPLATE = """---
language:
- en
license: apache-2.0
tags:
- wizard-skating
- trick-generation
- fine-tuned
- qlora
base_model: {base_model}
datasets:
- synthetic
pipeline_tag: text-generation
---

# WzrdBrain SLM

A small language model fine-tuned for wizard skating trick combo generation.

## What it does

- **Generates valid trick combos** with proper direction linking and rule compliance
- **Answers questions** about wizard skating moves, stances, and techniques
- **Suggests learning progressions** from beginner to expert

## Training

- **Base model**: {base_model}
- **Method**: QLoRA (4-bit quantized, LoRA r={lora_r}, alpha={lora_alpha})
- **Data**: ~9,000 synthetic examples generated from the [wzrdbrain](https://pypi.org/project/wzrdbrain/) library
- **Epochs**: {epochs}

## Usage

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("{repo_id}")
tokenizer = AutoTokenizer.from_pretrained("{repo_id}")

messages = [
    {{"role": "system", "content": "You are WzrdBrain, an expert wizard skating trick combo generator."}},
    {{"role": "user", "content": "Generate a 3-trick combo."}},
]

input_text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=256, temperature=0.7)
print(tokenizer.decode(outputs[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True))
```

## Rules the model follows

1. **Direction linking**: Each trick's exit direction matches the next trick's entry direction
2. **ONLY_FIRST**: Predator, predator one, and parallel can only start a combo
3. **Rotating moves**: Gazelle, lion, 180, 540, stunami, and ufo swivel flip direction
4. **26 valid moves**: The model only uses real wizard skating moves

## Links

- [wzrdbrain PyPI](https://pypi.org/project/wzrdbrain/)
- [Rocker'd Magic Moves](https://rockerd.web.app)
"""


def main() -> None:
    parser = argparse.ArgumentParser(description="Push WzrdBrain SLM to HF Hub")
    parser.add_argument(
        "--model-path",
        type=str,
        required=True,
        help="Path to the trained LoRA adapter directory",
    )
    parser.add_argument(
        "--repo-id",
        type=str,
        default=CONFIG["hub"]["repo_id"],
        help="HF Hub repo ID",
    )
    parser.add_argument(
        "--gguf",
        action="store_true",
        help="Also export GGUF quantized variants",
    )
    args = parser.parse_args()

    model_config = CONFIG["model"]
    lora_config = CONFIG["lora"]
    train_config = CONFIG["training"]

    print(f"Loading LoRA adapter from {args.model_path}...")

    from unsloth import FastLanguageModel

    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=args.model_path,
        max_seq_length=model_config["max_seq_length"],
        dtype=None,
        load_in_4bit=True,
    )

    # Generate model card
    model_card = MODEL_CARD_TEMPLATE.format(
        base_model=model_config["name"],
        lora_r=lora_config["r"],
        lora_alpha=lora_config["alpha"],
        epochs=train_config["num_epochs"],
        repo_id=args.repo_id,
    )

    # Push merged model to Hub
    print(f"Pushing merged model to {args.repo_id}...")
    model.push_to_hub_merged(
        args.repo_id,
        tokenizer,
        save_method="merged_16bit",
        token=True,
    )

    # Upload model card
    from huggingface_hub import HfApi

    api = HfApi()
    api.upload_file(
        path_or_fileobj=model_card.encode(),
        path_in_repo="README.md",
        repo_id=args.repo_id,
        token=True,
    )
    print(f"Model card uploaded to {args.repo_id}")

    # Optionally export GGUF
    if args.gguf:
        print("Exporting GGUF variants...")
        quantization_methods = ["q4_k_m", "q8_0"]
        model.push_to_hub_gguf(
            args.repo_id,
            tokenizer,
            quantization_method=quantization_methods,
            token=True,
        )
        print(f"GGUF variants uploaded: {quantization_methods}")

    print(f"\nDone! Model available at: https://huggingface.co/{args.repo_id}")


if __name__ == "__main__":
    main()
