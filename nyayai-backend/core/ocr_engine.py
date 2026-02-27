import pytesseract
import pdfplumber
from PIL import Image
import io

def preprocess_image(image_bytes: bytes) -> Image.Image:
    """Converts image to grayscale, applies thresholding for better OCR using Pillow."""
    img = Image.open(io.BytesIO(image_bytes))
    
    # Convert to grayscale
    gray = img.convert('L')
    
    # Thresholding
    thresh = gray.point(lambda p: 255 if p > 150 else 0)
    
    return thresh

def extract_text_from_image(file_bytes: bytes) -> str:
    """Extracts text from an image using pytesseract (eng+hin)."""
    img = preprocess_image(file_bytes)
    text = pytesseract.image_to_string(img, lang="eng+hin")
    return text

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from a PDF document using pdfplumber."""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = "\\n".join([page.extract_text() or "" for page in pdf.pages])
        return text
    except Exception as e:
        raise e
