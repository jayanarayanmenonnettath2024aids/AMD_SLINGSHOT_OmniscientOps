import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: email.split('@')[0], email });
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page-container">
      <div className="glass-card auth-card">
        <div className="auth-header">
          <h2 className="gradient-text">{translations.loginTitle}</h2>
          <p className="auth-subtitle">{translations.loginSubtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
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
          <div className="form-group">
            <label>{translations.passwordLabel}</label>
            <input
              type="password"
              placeholder="••••••••"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-actions">
            <label className="remember-me">
              <input type="checkbox" className="custom-checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" title={translations.forgotPasswordTitle}>{translations.forgotPasswordTitle}</Link>
          </div>
          <button type="submit" className="btn-primary auth-btn">
            {translations.signIn}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-footer">
          {translations.noAccount} <Link to="/register">{translations.registerLink}</Link>
        </p>
      </div>
    </div>

  );
};

export default LoginPage;
