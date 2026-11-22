import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Plus, FileText } from 'lucide-react';
import { products } from '../data/productCatalog';
import { useRfq } from '../context/RfqContext';
import { Button } from './Button';
import './Hero.css';

const pick = (v, lang) => (typeof v === 'string' ? v : lang.startsWith('ar') ? v.ar : v.en);

const heroProducts = products.filter((p) => p.heroFeatured);

export const Hero = ({ onInspectDevice }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ar';
  const isRtl = lang.startsWith('ar');
  const { isInRfq, toggleRfq } = useRfq();
  const [activeIdx, setActiveIdx] = useState(0);

  const active = heroProducts[activeIdx] || heroProducts[0];
  const inRfq = isInRfq(active.id);

  const handleAddRfq = () => {
    toggleRfq({
      id: active.id,
      name: active.name,
      manufacturer: active.manufacturer,
      category: pick(active.category, lang),
      type: 'product',
    });
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            {t('hero_title_line1')}
            <br />
            <span className="hero-title-accent">{t('hero_title_line2')}</span>
          </h1>

          <p className="hero-subtitle">{t('hero_subtitle')}</p>

          <div className="hero-actions">
            <Button variant="primary" href="#devices">
              <span>{t('hero_cta_primary')}</span>
              {isRtl ? <ArrowLeft size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
            </Button>
            <Button variant="ghost" href="#contact">
              {t('hero_cta_secondary')}
            </Button>
          </div>

          <dl className="hero-metrics">
            <div className="hero-metric">
              <dt>{t('hero_proof_years_label')}</dt>
              <dd className="mono-data">{t('hero_proof_years_val')}</dd>
            </div>
            <div className="hero-metric">
              <dt>{t('hero_proof_facilities_label')}</dt>
              <dd className="mono-data">{t('hero_proof_facilities_val')}</dd>
            </div>
            <div className="hero-metric">
              <dt>{t('hero_proof_support_label')}</dt>
              <dd className="mono-data">{t('hero_proof_support_val')}</dd>
            </div>
          </dl>
        </div>

        <div className="instrument-stage" aria-label={t('hero_stage_label')}>
          <div className="stage-header">
            <div className="stage-identity">
              <span className="stage-maker mono-data">{active.manufacturer}</span>
              <span className="stage-model mono-data">{active.name}</span>
            </div>
            <div className="stage-certs" aria-label={t('compare_row_certs')}>
              {active.certifications.map((cert) => (
                <span key={cert} className="stage-cert mono-data">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="stage-canvas">
            <span className="stage-tick tick-tl" aria-hidden="true" />
            <span className="stage-tick tick-tr" aria-hidden="true" />
            <span className="stage-tick tick-bl" aria-hidden="true" />
            <span className="stage-tick tick-br" aria-hidden="true" />

            <img
              key={active.id}
              src={active.image}
              alt={pick(active.imageAlt, lang)}
              width={active.imageWidth}
              height={active.imageHeight}
              className={`stage-image ${active.blendMultiply ? 'is-multiply' : ''}`}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="stage-telemetry surface-dark">
            <dl className="telemetry-grid">
              <div>
                <dt>{t('hero_spec_tat')}</dt>
                <dd className="tabular">{pick(active.compare.turnaround, lang)}</dd>
              </div>
              <div>
                <dt>{t('hero_spec_sample')}</dt>
                <dd className="tabular">{pick(active.compare.sampleVolume, lang)}</dd>
              </div>
              <div>
                <dt>{t('hero_spec_power')}</dt>
                <dd className="tabular">{pick(active.compare.power, lang)}</dd>
              </div>
            </dl>

            <div className="telemetry-actions">
              <button
                type="button"
                className={`stage-action-btn ${inRfq ? 'is-added' : ''}`}
                onClick={handleAddRfq}
              >
                {inRfq ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                <span>{inRfq ? t('hero_stage_added') : t('hero_stage_add_rfq')}</span>
              </button>

              <a
                href={`#${active.id}`}
                className="stage-inspect-link"
                onClick={() => onInspectDevice?.(active.groupId)}
              >
                <FileText size={15} aria-hidden="true" />
                <span>{t('hero_stage_inspect')}</span>
              </a>
            </div>
          </div>

          <div className="stage-switcher" role="group" aria-label={t('hero_stage_select')}>
            {heroProducts.map((item, idx) => {
              const selected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`switcher-btn ${selected ? 'is-active' : ''}`}
                  aria-pressed={selected}
                  onClick={() => setActiveIdx(idx)}
                >
                  <span className="switcher-name mono-data">{item.name}</span>
                  <span className="switcher-cat">{pick(item.category, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
