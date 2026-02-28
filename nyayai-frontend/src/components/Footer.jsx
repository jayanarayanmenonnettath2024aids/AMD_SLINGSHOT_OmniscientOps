import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { translations } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-main glass-card">
        <div className="footer-brand">
          <div className="brand-head">
            <div className="footer-logo">N</div>
            <h3 className="gradient-text">NyayAI</h3>
          </div>
          <p className="brand-desc">
            {translations.footerDesc}
          </p>
          <div className="social-links">
            <div className="social-pill">{translations.platformStatus}</div>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="link-col">
            <h4>{translations.techCol}</h4>
            <div className="link-items">
              <Link to="/analyze">{translations.analyzeTitle}</Link>
              <Link to="/ask">{translations.askTitle}</Link>
              <Link to="/draft">{translations.draftTitle}</Link>
            </div>
          </div>
          <div className="link-col">
            <h4>{translations.orgCol}</h4>
            <div className="link-items">
              <Link to="/about">{translations.missionLink}</Link>
              <Link to="/contact">{translations.contactLink}</Link>
              <Link to="/login">{translations.partnerPortal}</Link>
            </div>
          </div>
          <div className="link-col">
            <h4>{translations.legalCol}</h4>
            <div className="link-items">
              <Link to="/privacy">{translations.securityWhitepaper}</Link>
              <Link to="/terms">{translations.privacyEthics}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-sub">
        <p>&copy; 2026 NyayAI High-Performance Legal Intelligence System</p>
        <div className="sub-links">
          <span>{translations.designedWith}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
