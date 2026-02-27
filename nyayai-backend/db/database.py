import sqlite3
import os
from pathlib import Path
from db.models import SCHEMA_SQL
from utils.logger import app_logger

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "nyayai.db"

def get_db_connection():
    """Returns a connection object to the SQLite database."""
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row  # Access columns by name
    return conn

def init_db():
    """Initializes the SQLite database with the required schema."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Execute the schema creation script
        cursor.executescript(SCHEMA_SQL)
        
        conn.commit()
        conn.close()
        app_logger.info("Database initialized successfully.")
    except Exception as e:
        app_logger.error(f"Failed to initialize database: {e}")

# Initialize db implicitly on first import
init_db()
