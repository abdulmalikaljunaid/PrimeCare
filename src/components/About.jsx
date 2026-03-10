import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Clock, HeartPulse } from 'lucide-react';
import aboutBg from '../assets/about_bg.png';
import './About.css';

export const About = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Shield size={32} />, title: t('feat_quality', 'Top Quality'), desc: t('feat_quality_desc', 'Uncompromising healthcare standards.') },
    { icon: <Clock size={32} />, title: t('feat_support', '24/7 Support'), desc: t('feat_support_desc', 'Always there when you need us.') },
    { icon: <HeartPulse size={32} />, title: t('feat_care', 'Expert Care'), desc: t('feat_care_desc', 'Specialized medical professionals.') },
  ];

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-header text-center mb-8">
          <h2 className="text-gradient section-title">{t('nav_about')}</h2>
          <p className="section-subtitle">{t('about_subtitle', 'Leading the way in medical excellence')}</p>
        </div>
        
        <div className="about-grid">
          <div className="about-image-col animate-fade-in delay-100">
            <div className="about-decorative-blob"></div>
            <div className="about-image">
               <div className="about-img-inner">
                 <img src={aboutBg} alt="Prime Care Facilities" />
               </div>
            </div>
            <div className="experience-badge glass-dark">
              <span className="exp-number">15+</span>
              <span className="exp-text">{t('years_exp', 'Years of Excellence')}</span>
            </div>
          </div>
          
          <div className="about-content-col animate-fade-in delay-200">
            <h3 className="mb-4 text-2xl font-bold">{t('about_heading', 'Dedicated to Your Well-being')}</h3>
            <p className="text-muted mb-8 text-lg">
              {t('about_text', 'Prime Care is committed to providing comprehensive, high-quality medical services. Our state-of-the-art facilities and experienced staff ensure that you receive the best care possible.')}
            </p>
            
            <div className="features-list">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-text">
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-muted m-0">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
