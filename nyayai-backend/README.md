# NyayAI Backend - Offline Indian Legal Aid Assistant

NyayAI is a fully offline Indian legal assistant backend designed to process legal notices (PDF/Images) using OCR, retrieve relevant Indian laws via RAG, explain the documents using a local GenAI model (via GGUF/llama.cpp), and draft responses. It is optimized to run locally without internet access, particularly supporting acceleration on AMD NPUs via ONNX Runtime and system execution.

## Features

- **Offline Inference:** Runs `nyayai_legal.gguf` completely offline.
- **OCR Engine:** Uses `pytesseract` and `pdfplumber` for structured extraction.
- **RAG Engine:** Natively connects to local `SentenceTransformers` and ChromaDB.
- **Multilingual Support:** Placeholder architecture for AI4Bharat IndicTrans2 integration.
- **Secure File Processing:** Size constraints and type validations.
- **SQLite Database:** Native query and document tracking.

## Installation

### Prerequisites

- Python 3.11+
- Tesseract-OCR installed on your system.
  - Windows: Download from UB-Mannheim. Ensure `tesseract` is added to your PATH.
- (Optional but Recommended) AMD NPU Drivers for hardware acceleration.

### Setup Steps

1. Clone or navigate to this directory:
   ```bash
   cd nyayai-backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Model Preparation

### GGUF Model Setup
1. Download or locate your compiled `nyayai_legal.gguf` model.
2. Place the model file in the `data/models/` directory:
   ```
   nyayai-backend/data/models/nyayai_legal.gguf
   ```
### AMD NPU Acceleration
To run the model specifically utilizing your AMD Ryzen AI NPU:
1. Ensure your specific Ryzen series supports Ryzen AI and the NPU drivers are installed.
2. `llama-cpp-python` supports compiling with various backends. Wait for standard AMD Ryzen AI execution support or compile `llama.cpp` locally with Vulkan or specific AMD extensions, and reinstall the python bindings: `CMAKE_ARGS="-DLLAMA_VULKAN=on" pip install llama-cpp-python --upgrade --force-reinstall`.

### Building the RAG Index
1. Make sure your `.jsonl` corpus files (`ipc_sections.jsonl`, `crpc_procedures.jsonl`, etc.) are converted to standard query strings.
2. You can build the database programmatically using standard ChromaDB insertion scripts placing the output into `data/rag_index/`.
3. The embedding model (`sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`) will automatically be downloaded on the first run, or you can cache it manually and set `HF_HUB_OFFLINE=1`.

## Running the Application

To start the FastAPI offline server:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The server will automatically generate `nyayai.db` in the root folder via `db/database.py` and begin serving on `http://127.0.0.1:8000`.

## API Usage Examples

### 1. Analyze Document (`POST /analyze-document`)

```bash
curl -X POST "http://127.0.0.1:8000/analyze-document" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@eviction_notice.pdf"
```

### 2. Ask a Question (`POST /ask-question`)

```bash
curl -X POST "http://127.0.0.1:8000/ask-question" \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Section 138 of the Negotiable Instruments Act?", "language":"english"}'
```

### 3. Draft a Legal Response (`POST /draft-response`)

```bash
curl -X POST "http://127.0.0.1:8000/draft-response" \
  -H "Content-Type: application/json" \
  -d '{
    "document_text": "Received cheque bounce notice for Rs. 50,000",
    "citizen_situation": "I already paid the amount last week via bank transfer",
    "language": "english"
  }'
```

## Folder Structure

```text
nyayai-backend/
│── main.py                 # FastAPI Application entrypoint
│── config.py               # Global settings and paths
│── requirements.txt        # Full explicit python dependencies
│── README.md               # User documentation
│
├── core/                   # Core business logic and AI
│   ├── model_loader.py     # Llama.cpp inference connection
│   ├── rag_engine.py       # SentenceTransformers / Chroma DB
│   ├── translator.py       # Translation wrappers
│   ├── ocr_engine.py       # Pytesseract implementation
│   └── pipeline.py         # App unification logic
│
├── routes/                 # FastAPI HTTP endopoints
│   ├── analyze.py          # /analyze-document
│   ├── ask.py              # /ask-question
│   └── draft.py            # /draft-response
│
├── db/                     # Data Storage
│   ├── database.py         # SQLite creation and connection
│   └── models.py           # SQL schemas and Pydantic models
│
├── utils/                  # Helper functions
│   ├── logger.py           # Logging setup
│   ├── file_utils.py       # Validation rules for UI uploads
│   └── text_cleaning.py    # Noise removal utility
│
└── data/                   # Dynamic files mapping
    ├── rag_index/          # Persistent Chroma DB location
    ├── uploads/            # Temporary parsed caches
    └── models/             # Contains the Local models (.gguf)
```
