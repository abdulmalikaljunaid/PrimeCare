import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { useRfq } from '../context/RfqContext';
import './FloatingWhatsApp.css';

const WHATSAPP_NUMBER = '967773662701';

export const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  const { rfqItems, compareIds } = useRfq();
  const hasTray = rfqItems.length > 0 || compareIds.length > 0;
  const text = encodeURIComponent(t('wa_default_message'));
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`floating-whatsapp ${hasTray ? 'is-lifted' : ''}`}
      aria-label={t('wa_float_label')}
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="wa-label">{t('wa_float_text')}</span>
    </a>
  );
};
