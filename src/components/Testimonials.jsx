import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';

import drSamiImg from '../assets/dr_sami.jpeg';
import drMajedImg from '../assets/dr_majed.jpeg';
import alahliImg from '../assets/alahly-hosp.jpg'; 
import engAbdulmalekImg from '../assets/eng_abdulmalek.jpeg';

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      textKey: 'testim_1_text',
      authorKey: 'testim_1_author',
      roleKey: 'testim_1_role',
      image: drSamiImg
    },
    {
      id: 2,
      textKey: 'testim_2_text',
      authorKey: 'testim_2_author',
      roleKey: 'testim_2_role',
      image: drMajedImg
    },
    {
      id: 3,
      textKey: 'testim_3_text',
      authorKey: 'testim_3_author',
      roleKey: 'testim_3_role',
      image: alahliImg
    },
    {
      id: 4,
      textKey: 'testim_4_text',
      authorKey: 'testim_4_author',
      roleKey: 'testim_4_role',
      image: engAbdulmalekImg
    }
  ];

  const StarRating = () => (
    <div className="rating-stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={18} className="star-icon" />
      ))}
    </div>
  );

  return (
    <section className="section testimonials" id="testimonials">
      <div className="testimonials-bg-orbs"></div>
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
            <div className="badge-category mb-4" style={{ display: 'inline-block', padding: '0.4rem 1.25rem', background: 'var(--primary-light)', color: 'var(--primary-hover)', borderRadius: 'var(--radius-full)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              {t('testim_badge', 'شركاء النجاح')}
            </div>
          <h2 className="section-title text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            {t('testim_title')}
          </h2>
          <p className="section-subtitle">{t('testim_subtitle')}</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testim, idx) => (
            <div key={testim.id} className={`testimonial-card animate-fade-in delay-${(idx % 4 + 1) * 100}`}>
              <Quote className="quote-icon" size={80} strokeWidth={1} />
              
              <StarRating />
              
              <p className="testimonial-text">
                "{t(testim.textKey)}"
              </p>
              
              <div className="testimonial-divider"></div>
              
              <div className="testimonial-author">
                <img src={testim.image} alt={t(testim.authorKey)} className="testimonial-avatar" />
                <div className="testimonial-info">
                  <span className="testimonial-name">{t(testim.authorKey)}</span>
                  <span className="testimonial-role">{t(testim.roleKey)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
