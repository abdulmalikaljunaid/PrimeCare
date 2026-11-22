import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Statistics.css';

const Counter = ({ target, active }) => {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) {
      return undefined;
    }

    let rafId = 0;
    let start = null;
    const duration = 900;

    const tick = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [target, active]);

  return <>{display}</>;
};

export const Statistics = () => {
  const { t } = useTranslation();
  const [hasRevealed, setHasRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { id: 'years', raw: t('stats_years_val'), num: 15, suffix: '+', label: t('stats_years_label') },
    { id: 'clients', raw: t('stats_clients_val'), num: 50, suffix: '+', label: t('stats_clients_label') },
    { id: 'devices', raw: t('stats_devices_val'), num: 100, suffix: 'k+', label: t('stats_devices_label') },
    { id: 'support', raw: t('stats_support_val'), num: null, suffix: '', label: t('stats_support_label') },
  ];

  return (
    <section className="stats-band surface-dark" ref={sectionRef} aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        {t('stats_section_label')}
      </h2>
      <div className="container">
        <dl className="stats-row">
          {stats.map((item) => (
            <div key={item.id} className="stat-col">
              <dt>{item.label}</dt>
              <dd className="mono-data">
                {item.num !== null ? (
                  <>
                    <Counter target={item.num} active={hasRevealed} />
                    <span className="stat-suffix">{item.suffix}</span>
                  </>
                ) : (
                  item.raw
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
