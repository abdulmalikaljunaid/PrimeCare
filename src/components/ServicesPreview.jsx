import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import './ServicesPreview.css';

export const ServicesPreview = ({ onNavigateCatalog }) => {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.language || 'ar').startsWith('ar');
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      step: '01',
      title: t('srv_1_title'),
      desc: t('srv_1_desc'),
      points: [t('srv_1_p1'), t('srv_1_p2'), t('srv_1_p3')],
      actionLabel: t('srv_1_action'),
      href: '#devices',
      targetTab: 'blood-gas',
    },
    {
      step: '02',
      title: t('srv_2_title'),
      desc: t('srv_2_desc'),
      points: [t('srv_2_p1'), t('srv_2_p2'), t('srv_2_p3')],
      actionLabel: t('srv_2_action'),
      href: '#devices',
      targetTab: 'hematology',
    },
    {
      step: '03',
      title: t('srv_3_title'),
      desc: t('srv_3_desc'),
      points: [t('srv_3_p1'), t('srv_3_p2'), t('srv_3_p3')],
      actionLabel: t('srv_3_action'),
      href: '#contact',
      targetTab: null,
    },
  ];

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-header-split">
          <div>
            <h2>{t('services_heading')}</h2>
            <p>{t('services_subtitle')}</p>
          </div>
          <a href="#devices" className="btn btn-ghost">
            <span>{t('services_cta')}</span>
            <ArrowIcon size={16} aria-hidden="true" />
          </a>
        </div>

        <ol className="capability-ledger">
          {pillars.map((pillar) => (
            <li key={pillar.step} className="ledger-row">
              <div className="ledger-step mono-data" aria-hidden="true">
                {pillar.step}
              </div>

              <div className="ledger-summary">
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>

              <ul className="ledger-points">
                {pillar.points.map((point) => (
                  <li key={point}>
                    <Check size={16} className="ledger-check" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="ledger-action">
                <a
                  href={pillar.href}
                  className="ledger-link"
                  onClick={() => {
                    if (pillar.targetTab) {
                      onNavigateCatalog?.(pillar.targetTab);
                    }
                  }}
                >
                  <span>{pillar.actionLabel}</span>
                  <ArrowIcon size={15} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
