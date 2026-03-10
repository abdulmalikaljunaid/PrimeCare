import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Globe, Menu, X } from 'lucide-react';
import { Button } from './Button';
import logo from '../assets/logo.svg';
import './Navbar.css';

export const Navbar = () => {
  const { t } = useTranslation();
  const { toggleLanguage, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="navbar-wrapper animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="#home">
            <img src={logo} alt="Prime Care Logo" />
          </a>
        </div>
        
        <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" className="nav-link active" onClick={closeMenu}>{t('nav_home')}</a>
          <a href="#about" className="nav-link" onClick={closeMenu}>{t('nav_about')}</a>
          <a href="#services" className="nav-link" onClick={closeMenu}>{t('nav_services')}</a>
          <a href="#partners" className="nav-link" onClick={closeMenu}>{t('nav_partners')}</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>{t('nav_contact')}</a>
        </div>

        <div className="navbar-actions">
          <button className="lang-toggle-icon" onClick={toggleLanguage} aria-label="Toggle Language" title="Change Language">
            <Globe size={20} />
            <span className="lang-text">{isRTL ? 'EN' : 'عربي'}</span>
          </button>
          <Button variant="primary" href="#contact" className="header-contact-btn desktop-only">
            <Phone size={18} />
            {t('nav_contact')}
          </Button>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </div>
  );
};
