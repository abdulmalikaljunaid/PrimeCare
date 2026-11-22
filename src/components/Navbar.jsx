import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRfq } from '../context/RfqContext';
import logo from '../assets/logo.svg';
import './Navbar.css';

const NAV_SECTIONS = [
  { id: 'home', key: 'nav_home' },
  { id: 'about', key: 'nav_about' },
  { id: 'services', key: 'nav_services' },
  { id: 'devices', key: 'nav_devices' },
  { id: 'partners', key: 'nav_partners' },
];

export const Navbar = () => {
  const { t } = useTranslation();
  const { toggleLanguage, isRTL } = useLanguage();
  const { rfqItems } = useRfq();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 10);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = [...NAV_SECTIONS.map((s) => s.id), 'contact'];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} ref={headerRef}>
      <a href="#main-content" className="skip-link">
        {t('skip_to_content')}
      </a>

      <div className="container header-inner">
        <a href="#home" className="brand-link" onClick={closeMenu}>
          <img src={logo} alt={t('brand_logo_alt')} width="112" height="36" className="brand-logo" />
        </a>

        <nav className="desktop-nav" aria-label={t('nav_label')}>
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="lang-btn"
            onClick={toggleLanguage}
            aria-label={t('nav_toggle_lang')}
          >
            <Globe size={16} aria-hidden="true" />
            <span>{isRTL ? 'EN' : 'العربية'}</span>
          </button>

          <a
            href="#contact"
            className={`btn btn-primary header-cta ${activeSection === 'contact' ? 'is-current' : ''}`}
          >
            <FileSpreadsheet size={16} aria-hidden="true" />
            <span>{t('nav_contact')}</span>
            {rfqItems.length > 0 && (
              <span className="cta-count mono-data" aria-label={`${rfqItems.length} ${t('nav_rfq_count')}`}>
                {rfqItems.length}
              </span>
            )}
          </a>

          <button
            type="button"
            className="mobile-trigger"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={t('nav_toggle_menu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="scroll-rail" aria-hidden="true">
        <div className="scroll-rail-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {isMenuOpen && (
        <nav id="mobile-nav-drawer" className="mobile-drawer" aria-label={t('nav_label')}>
          <div className="container mobile-drawer-inner">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={closeMenu}
              >
                {t(item.key)}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary mobile-cta" onClick={closeMenu}>
              <FileSpreadsheet size={16} aria-hidden="true" />
              <span>{t('nav_contact')}</span>
              {rfqItems.length > 0 && <span className="cta-count mono-data">{rfqItems.length}</span>}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
