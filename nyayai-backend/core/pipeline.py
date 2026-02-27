from fastapi import UploadFile
from pathlib import Path

from core.ocr_engine import extract_text_from_image, extract_text_from_pdf
from core.translator import translate_to_english, translate_to_native
from core.rag_engine import query_rag
from core.model_loader import run_llm
from utils.text_cleaning import clean_extracted_text
from utils.logger import app_logger

async def process_document(file: UploadFile, lang: str = "hindi"):
    """
    Unified Pipeline 1: OCR -> Clean -> RAG -> LLM -> Translate
    """
    ext = Path(file.filename).suffix.lower()
    
    # OCR
    app_logger.info(f"Extracting text from {file.filename}")
    file_bytes = await file.read()
    
    if ext == ".pdf":
        raw_text = extract_text_from_pdf(file_bytes)
    else:
        raw_text = extract_text_from_image(file_bytes)
        
    # Clean
    cleaned_text = clean_extracted_text(raw_text)
    
    # Translate
    english_source_text = translate_to_english(cleaned_text)
    
    # RAG Search
    app_logger.info("Querying RAG index...")
    rag_context = query_rag(english_source_text)
    
    # LLM inference
    prompt = f"Explain the following legal document based on the context.\\n\\nContext:\\n{rag_context}\\n\\nDocument:\\n{english_source_text}\\n\\nExplanation:"
    english_explanation = await run_llm(prompt)
    
    # Translate target
    final_explanation = translate_to_native(english_explanation, lang)
    
    # Placeholder for accurate derived legal references parsing
    references = ["IPC Example", "CrPC Example"]
    
    return {
        "document_type": "Analyzed Document",
        "explanation": final_explanation,
        "extracted_text": cleaned_text,
        "legal_references": references
    }

async def answer_question(query: str, lang: str = "hindi"):
    """
    Unified Pipeline 2: Request -> Translation -> RAG -> LLM -> Translation
    """
    en_query = translate_to_english(query)
    
    rag_context = query_rag(en_query)
    
    prompt = f"Answer the user's question about Indian law based on the context.\\n\\nContext:\\n{rag_context}\\n\\nQuestion:\\n{en_query}\\n\\nAnswer:"
    en_answer = await run_llm(prompt)
    
    final_answer = translate_to_native(en_answer, lang)
    
    return {
        "answer": final_answer
    }

async def draft_legal_reply(text: str, situation: str, lang: str = "hindi"):
    """
    Unified Pipeline 3: Draft generation
    """
    en_text = translate_to_english(text)
    en_situation = translate_to_english(situation)
    
    prompt = f"Draft a professional legal reply letter based on the following.\\n\\nReceived Notice/Letter:\\n{en_text}\\n\\nClient's Situation/Defense:\\n{en_situation}\\n\\nDraft Letter:"
    en_draft = await run_llm(prompt)
    
    final_draft = translate_to_native(en_draft, lang)
    
    return {
        "draft": final_draft
    }
