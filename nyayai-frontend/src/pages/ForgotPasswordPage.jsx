import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { translations } = useLanguage();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Reset link requested for:', email);
        setIsSubmitted(true);
    };

    return (
        <div className="auth-page-container">
            <div className="glass-card auth-card animate-scale-in">
                <div className="auth-header">
                    <div className="auth-icon-circle">🔑</div>
                    <h2 className="gradient-text">{translations.forgotPasswordTitle}</h2>
                    <p className="auth-subtitle">
                        {isSubmitted ? translations.resetEmailSent : translations.forgotPasswordSubtitle}
                    </p>
                </div>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>{translations.emailLabel}</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="glass-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary auth-btn" style={{ marginTop: '1rem' }}>
                            {translations.resetPasswordBtn}
                        </button>
                    </form>
                ) : (
                    <div className="success-state" style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div className="success-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>
                            {translations.resetEmailSent}
                        </p>
                        <Link to="/login" className="btn-primary auth-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                            {translations.backToLogin}
                        </Link>
                    </div>
                )}

                {!isSubmitted && (
                    <div className="auth-footer" style={{ marginTop: '2rem' }}>
                        <Link to="/login" className="back-link">
                            ← {translations.backToLogin}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
