from llama_cpp import Llama
from config import GGUF_MODEL_PATH
from utils.logger import app_logger

import os

llm = None

def get_llm():
    global llm
    if llm is None:
        try:
            if not GGUF_MODEL_PATH.exists():
                app_logger.warning(f"Model not found at {GGUF_MODEL_PATH}. Inference will fail in production.")
            else:
                app_logger.info(f"Loading GGUF model from {GGUF_MODEL_PATH}")
                llm = Llama(
                    model_path=str(GGUF_MODEL_PATH),
                    n_ctx=4096,
                    n_threads=8,
                    temperature=0.2,
                    top_p=0.9,
                    repeat_penalty=1.1,
                    verbose=False
                )
        except Exception as e:
            app_logger.error(f"Failed to load LLM: {str(e)}")
    return llm

async def run_llm(prompt: str) -> str:
    """Runs a single prompt through the loaded local LLM."""
    model = get_llm()
    if not model:
        return "ERROR: LLM is not loaded. Please download the nyayai_legal.gguf file."
    
    try:
        app_logger.info("Running LLM Inference...")
        response = model(prompt, max_tokens=1024)
        return response["choices"][0]["text"].strip()
    except Exception as e:
        app_logger.error(f"Inference error: {str(e)}")
        return "ERROR: Inference failed."
