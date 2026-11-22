import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { compatibleReagents, verifiedManufacturers } from '../data/productCatalog';
import alawlaqiLogo from '../assets/alawlaqi-logo.svg';
import alahliLogo from '../assets/avatars/alahli-hosp.webp';
import sghLogo from '../assets/saudi-german-hosp.png';
import './Partners.css';

const pick = (v, lang) => (typeof v === 'string' ? v : lang.startsWith('ar') ? v.ar : v.en);

export const Partners = ({ onFilterManufacturer }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ar';
  const isRtl = lang.startsWith('ar');
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const clients = [
    {
      id: 'alawlaqi',
      name: t('client_alawlaqi_name'),
      role: t('client_alawlaqi_role'),
      logo: alawlaqiLogo,
      w: 44,
      h: 44,
    },
    {
      id: 'sgh',
      name: t('client_sgh_name'),
      role: t('client_sgh_role'),
      logo: sghLogo,
      w: 44,
      h: 44,
    },
    {
      id: 'alahli',
      name: t('client_alahli_name'),
      role: t('client_alahli_role'),
      logo: alahliLogo,
      w: 44,
      h: 44,
    },
    {
      id: 'aljunaid',
      name: t('client_aljunaid_name'),
      role: t('client_aljunaid_role'),
      logo: null,
    },
  ];

  return (
    <section className="section partners-section" id="partners">
      <div className="container">
        <div className="section-header">
          <h2>{t('partners_heading')}</h2>
          <p>{t('partners_subtitle')}</p>
        </div>

        {/* Tier 1: Verified Catalog Manufacturers */}
        <div className="partners-group">
          <h3 className="partners-subhead">{t('partners_oems_title')}</h3>
          <div className="oem-grid">
            {verifiedManufacturers.map((oem) => (
              <article key={oem.id} className="oem-card">
                <div className="oem-top">
                  <span className="oem-name mono-data">{oem.name}</span>
                  <span className="oem-country">
                    <span className="mono-data">{oem.code}</span> · {pick(oem.country, lang)}
                  </span>
                </div>
                <p className="oem-specialty">{pick(oem.specialty, lang)}</p>
                <div className="oem-models">
                  {oem.models.map((m) => (
                    <span key={m} className="mono-data">
                      {m}
                    </span>
                  ))}
                </div>
                <a
                  href="#devices"
                  className="oem-link"
                  onClick={() => onFilterManufacturer?.(oem.searchTerm)}
                >
                  <span>{t('partners_oem_view')}</span>
                  <ArrowIcon size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Tier 2: Local Yemeni Healthcare Institutions */}
        <div className="partners-group">
          <h3 className="partners-subhead">{t('partners_clients_title')}</h3>
          <div className="clients-grid">
            {clients.map((client) => (
              <div key={client.id} className="client-cell">
                <div className="client-mark" aria-hidden="true">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt=""
                      width={client.w}
                      height={client.h}
                      loading="lazy"
                    />
                  ) : (
                    <Building2 size={22} />
                  )}
                </div>
                <div className="client-meta">
                  <h4>{client.name}</h4>
                  <p>{client.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent Compatible Reagent Note */}
        <div className="compat-footnote">
          <div className="compat-head">
            <h4>{t('partners_reagent_compat_title')}</h4>
            <p>{t('partners_reagent_compat_desc')}</p>
          </div>
          <div className="compat-list">
            {compatibleReagents.systems.map((sys) => (
              <span key={sys} className="mono-data">
                {sys}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
