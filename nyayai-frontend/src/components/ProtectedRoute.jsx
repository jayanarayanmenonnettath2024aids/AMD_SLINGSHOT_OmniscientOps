import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginRedirectModal from './LoginRedirectModal';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="neural-spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginRedirectModal />;
    }

    return children;
};

export default ProtectedRoute;
