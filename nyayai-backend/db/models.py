from pydantic import BaseModel, Field
from typing import List, Optional

# API Request/Response Pydantic Models

# POST /analyze-document
class AnalyzeDocumentResponse(BaseModel):
    document_type: str
    explanation: str
    extracted_text: str
    legal_references: List[str]

# POST /ask-question
class AskQuestionRequest(BaseModel):
    question: str
    language: str = "hindi"

class AskQuestionResponse(BaseModel):
    answer: str

# POST /draft-response
class DraftResponseRequest(BaseModel):
    document_text: str
    citizen_situation: str
    language: str = "hindi"

class DraftResponseResponse(BaseModel):
    draft: str

# SQLite raw table creation queries
SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    lang TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    extracted_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_id INTEGER,
    draft_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(doc_id) REFERENCES documents(id)
);
"""
