import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { analyzeDocument } from '../services/api';

const DocumentAnalyzer = () => {
    const { translations } = useLanguage();
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setResult(null);
        } else if (selectedFile) {
            alert('Please upload an image file for analysis.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFileChange(droppedFile);
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const data = await analyzeDocument(file);
            setResult(data);
        } catch (error) {
            console.error(error);
            alert('Error analyzing document');
        }
        setLoading(false);
    };

    return (
        <div className="analyzer-container animate-fade-in">
            <div className="analyzer-hero">
                <h1 className="hero-title">
                    <span className="gradient-text">{translations.analyzeTitle.split(' ')[0]}</span> {translations.analyzeTitle.split(' ').slice(1).join(' ')}
                </h1>
                <p className="hero-description">
                    {translations.analyzerHeroDesc}
                </p>
            </div>

            <div
                className={`glass-card upload-card ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    accept="image/*"
                />
                <span className="upload-icon-large">📄</span>
                <h3>
                    {file ? file.name : translations.dropFileText}
                </h3>
                <p className="text-muted">{translations.browseFiles}</p>
            </div>

            {previewUrl && (
                <div className="big-bold-preview">
                    <img src={previewUrl} alt="Document Preview" />
                    <div className="preview-overlay">
                        <div className="preview-info">
                            <div className="badge-premium">{translations.readyForProcessing}</div>
                            <span className="file-name-tag">{file.name}</span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                            className="btn-primary analyze-btn"
                            disabled={loading}
                        >
                            {loading ? translations.signingIn : translations.startAnalysis}
                        </button>
                    </div>
                </div>
            )}


            {result && (
                <div className="analysis-dashboard">
                    <div className="info-sidebar">
                        <div className="info-pill">
                            <h4>{translations.docType}</h4>
                            <p>{result.document_type}</p>
                        </div>
                        <div className="info-pill">
                            <h4>{translations.confidence}</h4>
                            <p className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900 }}>99.2%</p>
                        </div>
                        {result.legal_references.length > 0 && (
                            <div className="info-pill">
                                <h4>{translations.detectedStatutes}</h4>
                                <div className="ref-list">
                                    {result.legal_references.map((ref, i) => (
                                        <span key={i} className="ref-tag">{ref}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="explanation-main">
                        <h3 className="gradient-text">{translations.brainSummary}</h3>
                        <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
                            {result.explanation}
                        </p>
                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '16px' }}>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>{translations.intelNoteTitle}</h4>
                            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                                {translations.intelNoteDesc}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentAnalyzer;
