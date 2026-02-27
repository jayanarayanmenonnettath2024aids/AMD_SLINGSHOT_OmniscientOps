from fastapi import APIRouter
from db.models import DraftResponseRequest, DraftResponseResponse
from core.pipeline import draft_legal_reply
import db.database as database

router = APIRouter()

@router.post("/draft-response", response_model=DraftResponseResponse)
async def draft_response_endpoint(req: DraftResponseRequest):
    result = await draft_legal_reply(req.document_text, req.citizen_situation, req.language)
    
    # Save to db (assuming a default doc_id mapping if we don't have one in payload)
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO drafts (doc_id, draft_text) VALUES (?, ?)",
        (None, result["draft"])
    )
    conn.commit()
    conn.close()
    
    return DraftResponseResponse(**result)
