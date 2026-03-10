import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, ShieldPlus, HeartPulse, Stethoscope, Microscope, TestTube2, FlaskConical, Crosshair } from 'lucide-react';
import alawlaqiLogo from '../assets/alawlaqi-logo.svg';
import alahliLogo from '../assets/alahly-hosp.jpg';
import sghLogo from '../assets/saudi-german-hosp.png';
import './Partners.css';

export const Partners = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  const slowScroll = (ref) => {
    if (ref.current) {
      try {
        ref.current.getAnimations({ subtree: true }).forEach(a => {
          a.playbackRate = 0.15; // Slow down to 15% speed seamlessly
        });
      } catch (e) {
        // Fallback for extremely old browsers
      }
    }
  };

  const normalScroll = (ref) => {
    if (ref.current) {
      try {
        ref.current.getAnimations({ subtree: true }).forEach(a => {
          a.playbackRate = 1; // Restore normal speed
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const agenciesData = [
    { name: "partner_name_siemens", icon: <Activity strokeWidth={2} size={22} />, translationKey: "partner_siemens" },
    { name: "partner_name_ge", icon: <ShieldPlus strokeWidth={2} size={22} />, translationKey: "partner_ge" },
    { name: "partner_name_philips", icon: <HeartPulse strokeWidth={2} size={22} />, translationKey: "partner_philips" },
    { name: "partner_name_medtronic", icon: <Stethoscope strokeWidth={2} size={22} />, translationKey: "partner_medtronic" },
    { name: "partner_name_olympus", icon: <Crosshair strokeWidth={2} size={22} />, translationKey: "partner_olympus" },
    { name: "partner_name_roche", icon: <Microscope strokeWidth={2} size={22} />, translationKey: "partner_roche" },
    { name: "partner_name_abbott", icon: <TestTube2 strokeWidth={2} size={22} />, translationKey: "partner_abbott" },
    { name: "partner_name_stryker", icon: <FlaskConical strokeWidth={2} size={22} />, translationKey: "partner_stryker" }
  ];

  // Base clients data
  const baseClientsData = [
    { name: "partner_name_alahli", image: alahliLogo, translationKey: "partner_alahli" },
    { name: "partner_name_sgh", image: sghLogo, translationKey: "partner_sgh" },
    { name: "partner_name_alawlaqi", image: alawlaqiLogo, translationKey: "partner_alawlaqi" }
  ];

  // Repeat clients list multiple times to ensure enough width for super-wide screens (infinite scroll fix)
  const clientsData = [
    ...baseClientsData, ...baseClientsData, ...baseClientsData, 
    ...baseClientsData, ...baseClientsData, ...baseClientsData,
    ...baseClientsData, ...baseClientsData
  ];

  return (
    <section className="section partners-ultra" id="partners">
      {/* Delicate Contextual Background using Brand Gold */}
      <div className="partners-bg-gradient"></div>
      
      <div className="container text-center mb-8 relative z-10">
        <div className="badge-sleek mb-3">{t('nav_partners')}</div>
        <h2 className="title-premium text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{t('partners_title')}</h2>
        <p className="subtitle-premium mt-3">{t('partners_subtitle')}</p>
      </div>
      
      {/* Agencies Track */}
      <div className="track-container mb-6">
        <h3 className="track-title text-gradient">{t('partners_agencies_title')}</h3>
        <div 
          className={`carousel-ultra-wrapper ${isRTL ? 'is-rtl' : 'is-ltr'}`}
          onMouseEnter={() => slowScroll(track1Ref)}
          onMouseLeave={() => normalScroll(track1Ref)}
        >
          {/* Note: no "carousel-fade" masks, to ensure 100% constant visibility at edges */}
          
          <div className="carousel-ultra-track track-forwards" ref={track1Ref}>
            <div className="carousel-group">
              {agenciesData.map((brand, idx) => (
                <PartnerCard key={`age1-${idx}`} brand={brand} t={t} />
              ))}
            </div>
            <div className="carousel-group" aria-hidden="true">
              {agenciesData.map((brand, idx) => (
                <PartnerCard key={`age2-${idx}`} brand={brand} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clients Track */}
      <div className="track-container mt-2">
        <h3 className="track-title text-gradient">{t('partners_clients_title')}</h3>
        <div 
          className={`carousel-ultra-wrapper ${isRTL ? 'is-rtl' : 'is-ltr'}`}
          onMouseEnter={() => slowScroll(track2Ref)}
          onMouseLeave={() => normalScroll(track2Ref)}
        >
          {/* Note: no "carousel-fade" masks */}
          
          <div className="carousel-ultra-track track-reverse" ref={track2Ref}>
            <div className="carousel-group">
              {clientsData.map((brand, idx) => (
                <PartnerCard key={`cli1-${idx}`} brand={brand} t={t} />
              ))}
            </div>
            <div className="carousel-group" aria-hidden="true">
              {clientsData.map((brand, idx) => (
                <PartnerCard key={`cli2-${idx}`} brand={brand} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

// Extremely compact, full-color side-by-side card
const PartnerCard = ({ brand, t }) => (
  <div className="partner-sleek-card">
    <div className="partner-sleek-icon-wrapper">
      {brand.image ? (
        <img src={brand.image} alt={t(brand.name)} className="partner-sleek-image" />
      ) : (
        <div className="partner-sleek-icon">
          {brand.icon}
        </div>
      )}
    </div>
    <div className="partner-sleek-info">
      <h3 className="partner-sleek-title">{t(brand.name)}</h3>
      <p className="partner-sleek-desc">{t(brand.translationKey)}</p>
    </div>
  </div>
);
