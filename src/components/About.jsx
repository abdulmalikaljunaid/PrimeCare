import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, BatteryCharging, FlaskConical, Wrench, MapPin } from 'lucide-react';
import './About.css';

export const About = ({ onNavigateCatalog }) => {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.language || 'ar').startsWith('ar');
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      id: 'power',
      icon: BatteryCharging,
      title: t('pillar_1_title'),
      desc: t('pillar_1_desc'),
      action: t('pillar_1_action'),
      href: '#devices',
      targetTab: 'blood-gas',
    },
    {
      id: 'reagents',
      icon: FlaskConical,
      title: t('pillar_2_title'),
      desc: t('pillar_2_desc'),
      action: t('pillar_2_action'),
      href: '#devices',
      targetTab: 'hematology',
    },
    {
      id: 'engineering',
      icon: Wrench,
      title: t('pillar_3_title'),
      desc: t('pillar_3_desc'),
      action: t('pillar_3_action'),
      href: '#contact',
      targetTab: null,
    },
  ];

  return (
    <section className="about-band surface-dark" id="about">
      <div className="container">
        <div className="about-top">
          <h2>{t('about_heading')}</h2>
          <div className="about-hq-inline">
            <MapPin size={16} aria-hidden="true" />
            <span>{t('about_hq_value')}</span>
          </div>
        </div>

        <div className="pillars-strip">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="pillar-col">
                <span className="pillar-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a
                  href={item.href}
                  className="pillar-link"
                  onClick={() => {
                    if (item.targetTab) onNavigateCatalog?.(item.targetTab);
                  }}
                >
                  <span>{item.action}</span>
                  <ArrowIcon size={15} aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
