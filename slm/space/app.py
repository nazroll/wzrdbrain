"""
Gradio chat demo for WzrdBrain SLM.

Deployed to HF Spaces as an interactive wizard skating trick combo generator.

Usage (local):
    python slm/space/app.py
"""

import gradio as gr
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = "nazroll/wzrdbrain-slm"

SYSTEM_PROMPT = (
    "You are WzrdBrain, an expert wizard skating trick combo generator. "
    "You know all 26 wizard skating moves and the rules for combining them into valid combos. "
    "Tricks flow by linking exit directions to entry directions. "
    "You can generate combos, explain tricks, and suggest learning progressions."
)

EXAMPLES = [
    "Generate a 3-trick combo.",
    "Give me a 5-trick combo that starts with a gazelle.",
    "What is a stunami?",
    "What are the rules for making combos?",
    "I'm a beginner. What should I learn first?",
    "Give me a combo that includes a 360.",
    "How do rotating moves work?",
    "What difficulty level is acid slide?",
]

# Load model and tokenizer
print(f"Loading model: {MODEL_ID}")
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto",
)
print("Model loaded!")


def respond(
    message: str,
    history: list[dict[str, str]],
    temperature: float,
    max_tokens: int,
) -> str:
    """Generate a response from the WzrdBrain SLM."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Add conversation history
    for msg in history:
        messages.append(msg)

    messages.append({"role": "user", "content": message})

    input_text = tokenizer.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True
    )
    inputs = tokenizer(input_text, return_tensors="pt").to(model.device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            temperature=temperature,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id,
        )

    response = tokenizer.decode(
        outputs[0][inputs["input_ids"].shape[1] :],
        skip_special_tokens=True,
    )
    return response


demo = gr.ChatInterface(
    fn=respond,
    type="messages",
    title="WzrdBrain SLM",
    description=(
        "A small language model for wizard skating trick combos. "
        "Ask for combos, trick explanations, or learning advice!"
    ),
    examples=EXAMPLES,
    additional_inputs=[
        gr.Slider(0.1, 1.5, value=0.7, step=0.1, label="Temperature"),
        gr.Slider(64, 1024, value=512, step=64, label="Max tokens"),
    ],
    theme="soft",
)

if __name__ == "__main__":
    demo.launch()
