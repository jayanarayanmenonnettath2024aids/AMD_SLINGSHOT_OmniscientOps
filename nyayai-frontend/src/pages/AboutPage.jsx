import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { translations } = useLanguage();

  return (
    <div className="about-page">
      <section className="glass-card page-header">
        <h1 className="gradient-text">{translations.aboutTitle}</h1>
        <p>{translations.heroDescription}</p>
      </section>

      <div className="about-content">
        <div className="glass-card content-card">
          <h2>{translations.missionTitle}</h2>
          <p>
            NyayAI is dedicated to bridging the legal divide. We believe that legal understanding should not be a privilege,
            but a universal right. Our tools are designed to be offline-first, ensuring privacy and accessibility even in remote areas.
          </p>
        </div>

        <div className="glass-card content-card">
          <h2>Our Technology</h2>
          <p>
            We leverage state-of-the-art AI models optimized for legal text analysis and drafting.
            By processing everything locally, we guarantee that your sensitive legal documents never leave your device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
