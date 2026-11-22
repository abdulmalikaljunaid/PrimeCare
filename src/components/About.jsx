import React from 'react';
import { useTranslation } from 'react-i18next';
import { BatteryCharging, FlaskConical, Wrench, ShieldCheck, MapPin } from 'lucide-react';
import './About.css';

export const About = () => {
  const { t } = useTranslation();

  const commitments = [
    {
      id: 'power',
      icon: BatteryCharging,
      title: t('commit_1_title'),
      desc: t('commit_1_desc'),
    },
    {
      id: 'reagents',
      icon: FlaskConical,
      title: t('commit_2_title'),
      desc: t('commit_2_desc'),
    },
    {
      id: 'engineering',
      icon: Wrench,
      title: t('commit_3_title'),
      desc: t('commit_3_desc'),
    },
    {
      id: 'traceability',
      icon: ShieldCheck,
      title: t('commit_4_title'),
      desc: t('commit_4_desc'),
    },
  ];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-narrative">
            <h2>{t('about_heading')}</h2>
            <p className="about-lead">{t('about_subtitle')}</p>
            <p className="about-body">{t('about_body')}</p>

            <div className="about-hq">
              <span className="about-hq-icon" aria-hidden="true">
                <MapPin size={18} />
              </span>
              <div>
                <div className="about-hq-label">{t('about_hq_label')}</div>
                <div className="about-hq-value">{t('about_hq_value')}</div>
              </div>
            </div>
          </div>

          <div className="commitments-panel" aria-label={t('about_commitments_heading')}>
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="commitment-cell">
                  <span className="commitment-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
