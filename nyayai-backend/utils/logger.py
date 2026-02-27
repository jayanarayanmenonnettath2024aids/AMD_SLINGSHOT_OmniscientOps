import logging
import sys
from pathlib import Path

# Ensure logs directory exists
LOG_DIR = Path(__file__).resolve().parent.parent / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)

# Create a custom logger
logger = logging.getLogger("nyayai")
logger.setLevel(logging.DEBUG)

# Create handlers
c_handler = logging.StreamHandler(sys.stdout)
f_handler = logging.FileHandler(LOG_DIR / "nyayai.log")
error_handler = logging.FileHandler(LOG_DIR / "errors.log")

c_handler.setLevel(logging.INFO)
f_handler.setLevel(logging.DEBUG)
error_handler.setLevel(logging.ERROR)

# Create formatters and add it to handlers
log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c_handler.setFormatter(log_format)
f_handler.setFormatter(log_format)
error_handler.setFormatter(log_format)

# Add handlers to the logger
logger.addHandler(c_handler)
logger.addHandler(f_handler)
logger.addHandler(error_handler)

def get_logger():
    return logger

app_logger = get_logger()
