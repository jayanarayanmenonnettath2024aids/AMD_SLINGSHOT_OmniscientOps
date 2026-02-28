import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LoginRedirectModal = () => {
    const [timeLeft, setTimeLeft] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    const { translations } = useLanguage();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/login', { state: { from: { pathname: location.pathname } }, replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, location]);

    return (
        <div className="modal-overlay">
            <div className="glass-card modal-content auth-redirect-modal animate-scale-in">
                <div className="modal-icon">🔒</div>
                <h2 className="gradient-text">Access Restricted</h2>
                <p className="modal-message">
                    {translations.loginRequired}
                </p>
                <div className="countdown-container">
                    <div className="countdown-bar">
                        <div className="countdown-progress" style={{ animationDuration: '3s' }}></div>
                    </div>
                    <span className="countdown-text">Redirecting in {timeLeft}s...</span>
                </div>
            </div>
        </div>
    );
};

export default LoginRedirectModal;
