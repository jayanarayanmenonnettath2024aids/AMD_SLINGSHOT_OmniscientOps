import re

def clean_extracted_text(text: str) -> str:
    """
    Cleans OCR-extracted or PDF-extracted text by standardizing whitespace
    and removing spurious characters.
    """
    if not text:
        return ""
    
    # Remove control characters except standard whitespace
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', text)
    
    # Replace multiple spaces with a single space
    text = re.sub(r' {2,}', ' ', text)
    
    # Standardize newlines
    text = re.sub(r'\r\n', '\n', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text.strip()
