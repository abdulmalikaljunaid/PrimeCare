import React from 'react';
import { useTranslation } from 'react-i18next';
import { MonitorDot, FlaskConical, Microscope, Syringe, Wrench, GraduationCap } from 'lucide-react';
import './ServicesPreview.css';

export const ServicesPreview = () => {
  const { t } = useTranslation();

  const services = [
    { 
      id: '01',
      icon: <MonitorDot size={28} />, 
      title: t('srv_devices'), 
      desc: t('srv_devices_desc') 
    },
    { 
      id: '02',
      icon: <FlaskConical size={28} />, 
      title: t('srv_reagents'), 
      desc: t('srv_reagents_desc') 
    },
    { 
      id: '03',
      icon: <Microscope size={28} />, 
      title: t('srv_lab'), 
      desc: t('srv_lab_desc') 
    },
    { 
      id: '04',
      icon: <Syringe size={28} />, 
      title: t('srv_consumables'), 
      desc: t('srv_consumables_desc') 
    },
    { 
      id: '05',
      icon: <Wrench size={28} />, 
      title: t('srv_maintenance'), 
      desc: t('srv_maintenance_desc') 
    },
    { 
      id: '06',
      icon: <GraduationCap size={28} />, 
      title: t('srv_training'), 
      desc: t('srv_training_desc') 
    },
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        
        <div className="text-center mb-12 animate-fade-in">
          <div className="badge-category mb-4">{t('nav_services')}</div>
          <h2 className="section-title text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            {t('services_titleMain', 'Comprehensive Medical Solutions')}
          </h2>
          <p className="section-subtitle">{t('services_subtitle')}</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className={`service-card animate-fade-in delay-${(idx % 3 + 1) * 100}`}>
              <div className="service-card-header">
                <span className="service-number">{service.id}</span>
                <div className="service-icon-wrapper">
                   {service.icon}
                </div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
