import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { askQuestion } from '../services/api';

const LegalChat = () => {
    const { language, translations } = useLanguage();
    const [question, setQuestion] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!question.trim()) return;

        const userMsg = { role: 'user', text: question };
        setChat(prev => [...prev, userMsg]);
        setQuestion('');
        setLoading(true);

        try {
            const data = await askQuestion(question, language);
            setChat(prev => [...prev, { role: 'ai', text: data.answer }]);
        } catch (error) {
            console.error(error);
            setChat(prev => [...prev, { role: 'ai', text: 'Error getting answer.' }]);
        }
        setLoading(false);
    };

    return (
        <div className="feature-container">
            <div className="chat-window">
                <div className="messages">
                    {chat.length === 0 && (
                        <div className="welcome-msg">
                            <span className="welcome-icon">🧠</span>
                            <h2 className="gradient-text">{translations.askTitle}</h2>
                            <p className="text-muted">
                                {translations.welcomeTextChat}
                            </p>
                        </div>
                    )}

                    {chat.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            <div className="message-bubble">
                                <span className="ai-meta">
                                    {msg.role === 'ai' ? translations.aiRole : translations.userRole}
                                </span>
                                <div className="message-text">
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="message ai">
                            <div className="message-bubble">
                                <span className="ai-meta">{translations.aiRole}</span>
                                <div className="typing-indicator">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={translations.placeholderAsk || "Describe your legal situation..."}
                        className="neural-input"
                    />
                    <button
                        onClick={handleSend}
                        className="send-btn"
                        disabled={loading || !question.trim()}
                        title="Send Message"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalChat;

