import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileSpreadsheet, GitCompareArrows, Trash2, X } from 'lucide-react';
import { useRfq } from '../context/RfqContext';
import './RfqTray.css';

export const RfqTray = () => {
  const { t } = useTranslation();
  const { rfqItems, clearRfq, compareIds, setCompareOpen, clearCompare } = useRfq();

  if (rfqItems.length === 0 && compareIds.length === 0) return null;

  const handleOpenCompare = () => {
    setCompareOpen(true);
    const el = document.getElementById('devices');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="rfq-tray surface-dark" aria-label={t('rfq_tray_label')}>
      <div className="container rfq-tray-inner">
        <div className="rfq-tray-info">
          {rfqItems.length > 0 && (
            <div className="rfq-tray-count">
              <span className="tray-badge mono-data">{rfqItems.length}</span>
              <span>{t('rfq_tray_items')}</span>
            </div>
          )}

          {compareIds.length > 0 && (
            <div className="tray-compare-group">
              <button type="button" className="btn btn-dark-ghost tray-btn" onClick={handleOpenCompare}>
                <GitCompareArrows size={16} aria-hidden="true" />
                <span>
                  {t('compare_open_btn')} ({compareIds.length})
                </span>
              </button>
              <button
                type="button"
                className="tray-dismiss-btn"
                onClick={clearCompare}
                aria-label={t('compare_clear')}
                title={t('compare_clear')}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="rfq-tray-actions">
          {rfqItems.length > 0 && (
            <>
              <button
                type="button"
                className="tray-clear-btn"
                onClick={clearRfq}
                aria-label={t('rfq_tray_clear')}
              >
                <Trash2 size={15} aria-hidden="true" />
                <span>{t('rfq_tray_clear')}</span>
              </button>
              <a href="#contact" className="btn btn-gold tray-btn">
                <FileSpreadsheet size={16} aria-hidden="true" />
                <span>{t('rfq_tray_go_form')}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
