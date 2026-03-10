import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoWhite from '../assets/logo-white.svg';
import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="footer glass-dark">
      <div className="footer-watermark">{t('brand_watermark', 'PRIME CARE')}</div>
      
      <div className="container footer-container">
        <div className="footer-brand animate-fade-in delay-100">
          <img src={logoWhite} alt="Prime Care Logo" className="footer-logo" />
          <p className="footer-desc">
            {t('hero_subtitle', 'Leading healthcare services with absolute professionalism and care. Empowering the medical sector with the latest equipment and modern technologies.')}
          </p>
        </div>
        
        <div className="footer-column animate-fade-in delay-200">
          <h4>{t('quick_links', 'Quick Links')}</h4>
          <nav>
            <a href="#home">{t('nav_home')}</a>
            <a href="#about">{t('nav_about')}</a>
            <a href="#services">{t('nav_services')}</a>
            <a href="#partners">{t('nav_partners')}</a>
          </nav>
        </div>
        
        <div className="footer-column animate-fade-in delay-250">
          <h4>{t('our_services', 'Our Services')}</h4>
          <nav>
            <a href="#services">{t('srv_devices', 'Medical Devices')}</a>
            <a href="#services">{t('srv_lab', 'Laboratory Equipment')}</a>
            <a href="#services">{t('srv_consumables', 'Medical Consumables')}</a>
            <a href="#services">{t('srv_maintenance', 'Maintenance & Support')}</a>
          </nav>
        </div>
        
        <div className="footer-contact animate-fade-in delay-300">
          <h4>{t('nav_contact')}</h4>
          <div className="footer-contact-item">
            <div className="footer-icon"><Mail size={18} /></div>
            <a href="mailto:info@primecare.com">info@primecare.com</a>
          </div>
          <div className="footer-contact-item">
            <div className="footer-icon"><Phone size={18} /></div>
            <a href="tel:+967712828000" dir="ltr">+967 712 828 000</a>
          </div>
          <div className="footer-contact-item">
            <div className="footer-icon"><MapPin size={18} /></div>
            <p>{t('location_desc', 'Riyadh, Saudi Arabia')}</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} {t('brand_watermark', 'Prime Care')}. {t('all_rights', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};
