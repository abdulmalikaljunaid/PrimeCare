import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import './FloatingWhatsApp.css';

export const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  const whatsappNumber = "967712828000";
  const text = encodeURIComponent(t('wa_message', 'مرحباً فريق Prime Care، لدي استفسار بخصوص خدماتكم.'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="تواصل معنا عبر الواتساب"
    >
      <MessageCircle size={32} />
      <span className="pulse-ring"></span>
    </a>
  );
};
