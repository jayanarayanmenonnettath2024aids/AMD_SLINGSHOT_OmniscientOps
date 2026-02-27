from sentence_transformers import SentenceTransformer
import chromadb
from pathlib import Path
from config import RAG_INDEX_DIR
import os

embedding_model = None
chroma_client = None
collection = None

# Using the requested model
MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"

def init_rag():
    global embedding_model, chroma_client, collection
    
    if embedding_model is None:
        try:
            # Prefer loading from local huggingface cache
            embedding_model = SentenceTransformer(MODEL_NAME)
        except Exception as e:
            pass # Fails gracefully if not downloaded

    if chroma_client is None:
        try:
            chroma_client = chromadb.PersistentClient(path=str(RAG_INDEX_DIR))
            collection = chroma_client.get_or_create_collection(name="indian_law_corpus")
        except Exception:
            pass

init_rag()

def query_rag(query: str, k: int = 5) -> str:
    """Queries ChromaDB for relevant legal sections."""
    if embedding_model is None or collection is None:
        return ""
        
    try:
        query_embedding = embedding_model.encode([query]).tolist()
        
        results = collection.query(
            query_embeddings=query_embedding,
            n_results=k
        )
        
        context_docs = results.get("documents", [[]])[0]
        return "\n".join(context_docs)
    except Exception as e:
        return f"Error querying RAG index: {str(e)}"
