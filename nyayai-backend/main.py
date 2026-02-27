from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes.analyze import router as analyze_router
from routes.ask import router as ask_router
from routes.draft import router as draft_router
from utils.logger import app_logger

# Initialize Database and RAG explicitly if needed on boot, but they are module-bound implicitly
import db.database
import core.rag_engine

app = FastAPI(
    title="NyayAI Backend",
    description="Offline Indian Legal Aid Assistant",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, tags=["Processing"])
app.include_router(ask_router, tags=["Q&A"])
app.include_router(draft_router, tags=["Drafting"])

@app.on_event("startup")
async def startup_event():
    app_logger.info("NyayAI Backend Started Successfully in Offline Mode.")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
