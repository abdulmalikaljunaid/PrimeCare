import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { HeartPulse, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import './Hero.css';

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <section className="hero" id="home">
      <div className="hero-bg-orbs">
        <div className="hero-orb-1"></div>
        <div className="hero-orb-2"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            {t('hero_title')}
          </h1>
          <p className="hero-subtitle animate-fade-in delay-100">
            {t('hero_subtitle')}
          </p>
          <div className="hero-actions animate-fade-in delay-200">
            <Button variant="primary" href="#services">
              {t('hero_cta')}
              {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </Button>
            <Button variant="secondary" className="glass btn-accent" href="#contact" style={{ background: 'var(--accent)', color: 'white' }}>
              {t('nav_contact')}
            </Button>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in delay-300">
          <div className="hero-image-wrapper">
             {/* Note: In a real environment, replace this with a high quality image. Using the provided UI asset. */}
             <img src="/src/assets/hero_bg.png" alt="Prime Care Facilities" className="hero-image" />
             
             {/* Floating Badges */}
             <div className="hero-badge badge-1">
               <div className="badge-icon badge-accent">
                 <HeartPulse size={24} />
               </div>
               <div className="badge-text">
                 <span className="badge-title">24/7</span>
                 <span className="badge-sub">{t('expert_care', 'Expert Care')}</span>
               </div>
             </div>
             
             <div className="hero-badge badge-2">
               <div className="badge-icon">
                 <ShieldCheck size={24} />
               </div>
               <div className="badge-text">
                 <span className="badge-title">100%</span>
                 <span className="badge-sub">{t('trusted_service', 'Trusted Provider')}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
