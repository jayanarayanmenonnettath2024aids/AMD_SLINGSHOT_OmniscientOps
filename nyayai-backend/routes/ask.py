from fastapi import APIRouter
from db.models import AskQuestionRequest, AskQuestionResponse
from core.pipeline import answer_question
import db.database as database

router = APIRouter()

@router.post("/ask-question", response_model=AskQuestionResponse)
async def ask_question_endpoint(req: AskQuestionRequest):
    result = await answer_question(req.question, req.language)
    
    # Log query to db
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO queries (question, answer, lang) VALUES (?, ?, ?)",
        (req.question, result["answer"], req.language)
    )
    conn.commit()
    conn.close()
    
    return AskQuestionResponse(**result)
