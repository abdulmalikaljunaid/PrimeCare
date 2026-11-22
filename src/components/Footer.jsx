import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import logoWhite from '../assets/logo-white.svg';
import './Footer.css';

export const Footer = ({ onNavigateCatalog }) => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer surface-dark">
      <h2 className="sr-only">{t('footer_nav_label')}</h2>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src={logoWhite}
            alt={t('brand_logo_alt')}
            width="136"
            height="44"
            className="footer-logo"
            loading="lazy"
          />
          <p className="footer-summary">{t('hero_subtitle')}</p>
        </div>

        <nav className="footer-col" aria-label={t('footer_quick_links')}>
          <h3>{t('footer_quick_links')}</h3>
          <ul>
            <li>
              <a href="#home">{t('nav_home')}</a>
            </li>
            <li>
              <a href="#about">{t('nav_about')}</a>
            </li>
            <li>
              <a href="#devices">{t('nav_devices')}</a>
            </li>
            <li>
              <a href="#partners">{t('nav_partners')}</a>
            </li>
            <li>
              <a href="#contact">{t('nav_contact')}</a>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label={t('footer_catalog_links')}>
          <h3>{t('footer_catalog_links')}</h3>
          <ul>
            <li>
              <a href="#devices" onClick={() => onNavigateCatalog?.('hematology')}>
                {t('footer_cat_hematology')}
              </a>
            </li>
            <li>
              <a href="#devices" onClick={() => onNavigateCatalog?.('blood-gas')}>
                {t('footer_cat_bloodgas')}
              </a>
            </li>
            <li>
              <a href="#devices" onClick={() => onNavigateCatalog?.('diabetes-renal')}>
                {t('footer_cat_diabetes')}
              </a>
            </li>
            <li>
              <a href="#devices" onClick={() => onNavigateCatalog?.('catalog-families')}>
                {t('footer_cat_families')}
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer-col">
          <h3>{t('footer_contact_title')}</h3>
          <ul className="footer-contact-list">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href="tel:+967773662701" className="mono-data">
                +967 773 662 701
              </a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:info@primecare.com" className="mono-data">
                info@primecare.com
              </a>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>{t('contact_location_value')}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © <span className="mono-data">{new Date().getFullYear()}</span> {t('footer_rights')}
          </p>
          <a href="#home" className="back-top-link">
            <span>{t('footer_back_top')}</span>
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
