import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import drSamiImg from '../assets/avatars/dr-sami.webp';
import drMajedImg from '../assets/avatars/dr-majed.webp';
import alahliImg from '../assets/avatars/alahli-hosp.webp';
import engAbdulmalekImg from '../assets/avatars/eng-abdulmalek.webp';
import './Testimonials.css';

export const Testimonials = () => {
  const { t } = useTranslation();

  const items = [
    {
      id: 1,
      text: t('testim_1_text'),
      author: t('testim_1_author'),
      role: t('testim_1_role'),
      image: drSamiImg,
      isInstitutionLogo: false,
    },
    {
      id: 2,
      text: t('testim_2_text'),
      author: t('testim_2_author'),
      role: t('testim_2_role'),
      image: drMajedImg,
      isInstitutionLogo: false,
    },
    {
      id: 3,
      text: t('testim_3_text'),
      author: t('testim_3_author'),
      role: t('testim_3_role'),
      image: alahliImg,
      isInstitutionLogo: true,
    },
    {
      id: 4,
      text: t('testim_4_text'),
      author: t('testim_4_author'),
      role: t('testim_4_role'),
      image: engAbdulmalekImg,
      isInstitutionLogo: false,
    },
  ];

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>{t('testim_heading')}</h2>
          <p>{t('testim_subtitle')}</p>
        </div>

        <div className="testimonials-grid">
          {items.map((item) => (
            <figure key={item.id} className="testimonial-card">
              <div className="testimonial-stars" role="img" aria-label={t('testim_rating_label')}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} fill="currentColor" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="testimonial-quote">
                <p>“{item.text}”</p>
              </blockquote>

              <figcaption className="testimonial-author">
                <div className={`author-media ${item.isInstitutionLogo ? 'is-logo' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.author}
                    width="52"
                    height="52"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="author-name">{item.author}</div>
                  <div className="author-role">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
