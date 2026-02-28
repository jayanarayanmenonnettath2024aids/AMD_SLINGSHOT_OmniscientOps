import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

export const analyzeDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/analyze-document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const askQuestion = async (question, language) => {
    const response = await api.post('/ask-question', { question, language });
    return response.data;
};

export const draftResponse = async (document_text, citizen_situation, language) => {
    const response = await api.post('/draft-response', {
        document_text,
        citizen_situation,
        language
    });
    return response.data;
};

export default api;
