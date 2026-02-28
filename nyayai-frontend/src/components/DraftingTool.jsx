import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { draftResponse } from '../services/api';

const DraftingTool = () => {
    const { language, translations } = useLanguage();
    const [docText, setDocText] = useState('');
    const [situation, setSituation] = useState('');
    const [draft, setDraft] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDraft = async () => {
        setLoading(true);
        try {
            const data = await draftResponse(docText, situation, language);
            setDraft(data.draft);
        } catch (error) {
            console.error(error);
            alert('Error generating draft');
        }
        setLoading(false);
    };

    return (
        <div className="feature-container">
            <div className="glass-card composer-card">
                <h2 className="gradient-text">{translations.draftTitle}</h2>
                <p className="text-muted mt-2">
                    {translations.draftSubtitle}
                </p>

                <div className="composer-section">
                    <div className="composer-field">
                        <label>{translations.docExcerptLabel}</label>
                        <textarea
                            className="composer-textarea"
                            value={docText}
                            onChange={(e) => setDocText(e.target.value)}
                            placeholder="Paste the source legal text here..."
                        />
                    </div>

                    <div className="composer-field">
                        <label>{translations.situationLabel}</label>
                        <textarea
                            className="composer-textarea"
                            value={situation}
                            onChange={(e) => setSituation(e.target.value)}
                            placeholder={translations.placeholderSituation || "Describe what you need the draft to accomplish..."}
                        />
                    </div>

                    <button
                        onClick={handleDraft}
                        className="btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="typing-indicator">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        ) : (
                            translations.generate
                        )}
                    </button>
                </div>

                {draft && (
                    <div className="composer-result-card">
                        <h3 className="ai-meta">{translations.draftResultTitle}</h3>
                        <div className="draft-output">
                            {draft}
                        </div>
                        <div className="composer-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => navigator.clipboard.writeText(draft)}
                            >
                                {translations.copyBtn}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraftingTool;

