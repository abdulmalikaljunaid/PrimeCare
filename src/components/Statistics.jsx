import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Users, Stethoscope, Clock } from 'lucide-react';
import './Statistics.css';

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2500; // 2.5 seconds
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart curve for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <>{count}</>;
};

export const Statistics = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const stats = [
    { 
      id: 1, 
      icon: <Award size={40} className="stat-icon" strokeWidth={1.5} />, 
      value: t('stats_years', '+15'), 
      label: t('stats_years_desc', 'عاماً من التميز الطبي') 
    },
    { 
      id: 2, 
      icon: <Users size={40} className="stat-icon" strokeWidth={1.5} />, 
      value: t('stats_clients', '+50'), 
      label: t('stats_clients_desc', 'منشأة صحية متعاونة') 
    },
    { 
      id: 3, 
      icon: <Stethoscope size={40} className="stat-icon" strokeWidth={1.5} />, 
      value: t('stats_devices', '+100k'), 
      label: t('stats_devices_desc', 'جهاز ومستلزم تم توريده') 
    },
    { 
      id: 4, 
      icon: <Clock size={40} className="stat-icon" strokeWidth={1.5} />, 
      value: t('stats_support', '24/7'), 
      label: t('stats_support_desc', 'دعم هندسي وفني') 
    }
  ];

  const formatValue = (val) => {
    // Exception for values like 24/7
    if (val.includes('/')) {
      return <span className="stat-number-text">{val}</span>;
    }
    
    // Parse the prefix, number, and suffix
    const match = val.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
    if (match) {
      const prefix = match[1];
      const numStr = match[2];
      const suffix = match[3];
      const num = parseInt(numStr.replace(/,/g, ''), 10);
      
      return (
        <>
          {prefix && <span className="stat-highlight stat-prefix">{prefix}</span>}
          {isVisible && !isNaN(num) ? (
            <span className="stat-number-text"><Counter value={num} /></span>
          ) : (
             <span className="stat-number-text">{numStr}</span>
          )}
          {suffix && <span className="stat-highlight stat-suffix">{suffix}</span>}
        </>
      );
    }
    return <span className="stat-number-text">{val}</span>;
  };

  return (
    <section className="statistics-section" ref={sectionRef}>
      {/* Extremely soft ambient background glow */}
      <div className="stat-ambient-glow"></div>
      
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div 
              key={stat.id} 
              className={`stat-item ${isVisible ? 'animate-stat' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="stat-icon-container">
                {stat.icon}
              </div>
              
              <div className="stat-number" dir="ltr">
                {formatValue(stat.value)}
              </div>
              
              <h3 className="stat-title">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
