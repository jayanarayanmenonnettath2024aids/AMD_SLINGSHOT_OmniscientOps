import os
from pathlib import Path

# Base Directory Paths
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

# Sub-directories
MODELS_DIR = DATA_DIR / "models"
UPLOADS_DIR = DATA_DIR / "uploads"
RAG_INDEX_DIR = DATA_DIR / "rag_index"

# Ensure directories exist
for directory in [MODELS_DIR, UPLOADS_DIR, RAG_INDEX_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Application Settings
MAX_UPLOAD_SIZE_MB = 10
MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024
ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}

# Model Settings
GGUF_MODEL_PATH = MODELS_DIR / "nyayai_legal.gguf"

# Database Configuration
DATABASE_URL = str(BASE_DIR / "nyayai.db")
