import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { catalogFamilies, compatibleReagents, products } from '../data/productCatalog';
import { useRfq } from '../context/RfqContext';
import './Contact.css';

const WHATSAPP_NUMBER = '967773662701';
const OFFICIAL_EMAIL = 'info@primecare.com';
const DRAFT_KEY = 'primecare_rfq_draft_v1';

const pick = (v, lang) => (typeof v === 'string' ? v : lang.startsWith('ar') ? v.ar : v.en);

const loadDraft = () => {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage errors
  }
  return { name: '', organization: '', phone: '', email: '', topic: '', message: '' };
};

const generateRefCode = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(100 + Math.random() * 900));
  return `PC-${y}${m}${d}-${rand}`;
};

export const Contact = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ar';
  const isAr = lang.startsWith('ar');
  const { rfqItems, addRfq, removeRfq } = useRfq();

  const [form, setForm] = useState(loadDraft);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dispatchState, setDispatchState] = useState(null); // { ref, mode: 'api' | 'ready', summary }
  const [waNotice, setWaNotice] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage errors
    }
  }, [form]);

  const selectableCatalog = useMemo(() => {
    const pItems = products.map((p) => ({
      id: p.id,
      name: p.name,
      manufacturer: p.manufacturer,
      category: pick(p.category, lang),
      type: 'product',
    }));
    const fItems = catalogFamilies.map((f) => ({
      id: f.id,
      name: pick(f.title, lang),
      manufacturer: f.manufacturer,
      category: pick(f.category, lang),
      type: 'family',
    }));
    const rItem = {
      id: compatibleReagents.id,
      name: pick(compatibleReagents.title, lang),
      manufacturer: 'B&E Bio-Technology',
      category: t('pillar_2_title'),
      type: 'reagents',
    };
    return [...pItems, ...fItems, rItem];
  }, [lang, t]);

  const topics = [
    { value: 'device', label: t('form_topic_device') },
    { value: 'reagents', label: t('form_topic_reagents') },
    { value: 'maintenance', label: t('form_topic_maintenance') },
    { value: 'consult', label: t('form_topic_consult') },
  ];

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleQuickAdd = (e) => {
    const id = e.target.value;
    if (!id) return;
    const found = selectableCatalog.find((x) => x.id === id);
    if (found) addRfq(found);
    e.target.value = '';
  };

  const buildSummaryText = (refCode) => {
    const topicLabel = topics.find((x) => x.value === form.topic)?.label || form.topic || '-';
    const itemsBlock =
      rfqItems.length > 0
        ? rfqItems.map((it, idx) => `${idx + 1}. ${it.name} (${it.manufacturer})`).join('\n')
        : isAr
          ? 'غير محدد (استفسار عام)'
          : 'Not specified (general inquiry)';

    if (isAr) {
      return [
        `طلب عرض سعر رسمي — Prime Care`,
        `المرجع: ${refCode}`,
        `--------------------------------`,
        `الاسم: ${form.name}`,
        `المنشأة: ${form.organization || '-'}`,
        `الهاتف / واتساب: ${form.phone}`,
        `البريد الإلكتروني: ${form.email}`,
        `نوع الطلب: ${topicLabel}`,
        ``,
        `الأجهزة / العناصر المطلوبة:`,
        itemsBlock,
        ``,
        `التفاصيل والكميات:`,
        form.message,
      ].join('\n');
    }

    return [
      `Official Request for Quotation (RFQ) — Prime Care`,
      `Reference: ${refCode}`,
      `--------------------------------`,
      `Name: ${form.name}`,
      `Facility: ${form.organization || '-'}`,
      `Phone / WhatsApp: ${form.phone}`,
      `Email: ${form.email}`,
      `Inquiry Type: ${topicLabel}`,
      ``,
      `Selected Instruments / Items:`,
      itemsBlock,
      ``,
      `Quantities & Technical Notes:`,
      form.message,
    ].join('\n');
  };

  const validate = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.topic || !form.message.trim()) {
      setErrorMsg(t('form_validation_error'));
      return false;
    }
    return true;
  };

  const handleOfficialSubmit = async (e) => {
    e.preventDefault();
    setWaNotice(false);
    if (!validate()) return;

    const refCode = generateRefCode();
    const summary = buildSummaryText(refCode);
    const endpoint = import.meta.env.VITE_RFQ_ENDPOINT;

    if (endpoint) {
      setSubmitting(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ref: refCode,
            language: lang,
            ...form,
            items: rfqItems,
            summary,
          }),
        });
        if (res.ok) {
          setDispatchState({ ref: refCode, mode: 'api', summary });
          setSubmitting(false);
          return;
        }
      } catch {
        // Fall through cleanly to local formal dispatch options without losing user input
      }
      setSubmitting(false);
    }

    setDispatchState({ ref: refCode, mode: 'ready', summary });
  };

  const handleDirectWhatsApp = () => {
    if (!validate()) return;
    const refCode = generateRefCode();
    const summary = buildSummaryText(refCode);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWaNotice(true);
  };

  const handleCopySummary = async () => {
    if (!dispatchState?.summary) return;
    try {
      await navigator.clipboard.writeText(dispatchState.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Clipboard blocked; summary remains visible and selectable
    }
  };

  const mailtoHref = dispatchState
    ? `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(
        `${isAr ? 'طلب عرض سعر رسمي' : 'Official RFQ'} [${dispatchState.ref}] — ${form.organization || form.name}`,
      )}&body=${encodeURIComponent(dispatchState.summary)}`
    : `mailto:${OFFICIAL_EMAIL}`;

  const dispatchWaHref = dispatchState
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(dispatchState.summary)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>{t('contact_heading')}</h2>
          <p>{t('contact_subtitle')}</p>
        </div>

        <div className="contact-layout">
          <aside className="contact-desk">
            <h3>{t('contact_desk_title')}</h3>
            <p className="desk-desc">{t('contact_desk_desc')}</p>

            <dl className="desk-list">
              <div className="desk-item">
                <span className="desk-icon" aria-hidden="true">
                  <Phone size={18} />
                </span>
                <div>
                  <dt>{t('contact_phone_label')}</dt>
                  <dd>
                    <a href="tel:+967773662701" className="desk-link mono-data">
                      +967 773 662 701
                    </a>
                  </dd>
                </div>
              </div>

              <div className="desk-item">
                <span className="desk-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <div>
                  <dt>{t('contact_email_label')}</dt>
                  <dd>
                    <a href={`mailto:${OFFICIAL_EMAIL}`} className="desk-link mono-data">
                      {OFFICIAL_EMAIL}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="desk-item">
                <span className="desk-icon" aria-hidden="true">
                  <MapPin size={18} />
                </span>
                <div>
                  <dt>{t('contact_location_label')}</dt>
                  <dd>{t('contact_location_value')}</dd>
                </div>
              </div>

              <div className="desk-item">
                <span className="desk-icon" aria-hidden="true">
                  <Clock size={18} />
                </span>
                <div>
                  <dt>{t('contact_hours_label')}</dt>
                  <dd>{t('contact_hours_value')}</dd>
                </div>
              </div>
            </dl>
          </aside>

          <div className="rfq-card">
            <div className="rfq-card-head">
              <h3>{t('rfq_form_title')}</h3>
            </div>

            {dispatchState ? (
              <div className="dispatch-panel" role="status" aria-live="polite">
                <div className="dispatch-header">
                  <CheckCircle2 size={28} className="dispatch-icon" aria-hidden="true" />
                  <div>
                    <h4>
                      {t('form_dispatch_title')}{' '}
                      <span className="mono-data">{dispatchState.ref}</span>
                    </h4>
                    <p>
                      {dispatchState.mode === 'api'
                        ? t('form_dispatch_sent_api')
                        : t('form_dispatch_ready_desc')}
                    </p>
                  </div>
                </div>

                <pre className="dispatch-preview">{dispatchState.summary}</pre>

                <div className="dispatch-actions">
                  <a href={mailtoHref} className="btn btn-primary">
                    <Mail size={16} aria-hidden="true" />
                    <span>{t('form_dispatch_open_email')}</span>
                  </a>

                  <a
                    href={dispatchWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    <span>{t('form_dispatch_open_wa')}</span>
                  </a>

                  <button type="button" className="btn btn-ghost" onClick={handleCopySummary}>
                    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    <span>{copied ? t('form_dispatch_copied') : t('form_dispatch_copy')}</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setDispatchState(null)}
                  >
                    <Edit3 size={16} aria-hidden="true" />
                    <span>{t('form_dispatch_edit')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOfficialSubmit} noValidate>
                {/* Selected RFQ Items Box */}
                <div className="rfq-items-box">
                  <div className="rfq-items-label">{t('rfq_selected_label')}</div>

                  {rfqItems.length > 0 ? (
                    <ul className="rfq-chips">
                      {rfqItems.map((item) => (
                        <li key={item.id} className="rfq-chip">
                          <span className="rfq-chip-name">{item.name}</span>
                          <button
                            type="button"
                            className="rfq-chip-remove"
                            onClick={() => removeRfq(item.id)}
                            aria-label={`${t('rfq_remove_item')} ${item.name}`}
                          >
                            <X size={14} aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="rfq-empty-hint">{t('rfq_selected_empty')}</p>
                  )}

                  <label htmlFor="rfq-quick-add" className="sr-only">
                    {t('rfq_quick_add')}
                  </label>
                  <select
                    id="rfq-quick-add"
                    className="form-input form-select quick-add-select"
                    defaultValue=""
                    onChange={handleQuickAdd}
                  >
                    <option value="">{t('rfq_quick_add')}</option>
                    {selectableCatalog.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — {item.manufacturer}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="rfq-name">{t('form_name_label')} *</label>
                    <input
                      id="rfq-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="form-input"
                      placeholder={t('form_name_ph')}
                      value={form.name}
                      onChange={handleChange('name')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rfq-org">{t('form_org_label')}</label>
                    <input
                      id="rfq-org"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      className="form-input"
                      placeholder={t('form_org_ph')}
                      value={form.organization}
                      onChange={handleChange('organization')}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rfq-phone">{t('form_phone_label')} *</label>
                    <input
                      id="rfq-phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      autoComplete="tel"
                      className="form-input"
                      placeholder={t('form_phone_ph')}
                      value={form.phone}
                      onChange={handleChange('phone')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rfq-email">{t('form_email_label')} *</label>
                    <input
                      id="rfq-email"
                      name="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      className="form-input"
                      placeholder={t('form_email_ph')}
                      value={form.email}
                      onChange={handleChange('email')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-topic">{t('form_topic_label')} *</label>
                  <select
                    id="rfq-topic"
                    name="topic"
                    className="form-input form-select"
                    value={form.topic}
                    onChange={handleChange('topic')}
                    required
                  >
                    <option value="" disabled>
                      {t('form_topic_select')}
                    </option>
                    {topics.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-message">{t('form_message_label')} *</label>
                  <textarea
                    id="rfq-message"
                    name="message"
                    rows="4"
                    className="form-input"
                    placeholder={t('form_message_ph')}
                    value={form.message}
                    onChange={handleChange('message')}
                    required
                  />
                </div>

                {errorMsg && (
                  <div className="form-alert is-error" role="alert">
                    {errorMsg}
                  </div>
                )}

                {waNotice && (
                  <div className="form-alert is-ok" role="status" aria-live="polite">
                    {t('form_wa_opened_note')}
                  </div>
                )}

                <div className="form-submit-row">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    <Send size={16} aria-hidden="true" />
                    <span>{submitting ? t('form_submitting') : t('form_submit_official')}</span>
                  </button>

                  <button type="button" className="btn btn-gold" onClick={handleDirectWhatsApp}>
                    <MessageCircle size={16} aria-hidden="true" />
                    <span>{t('form_submit_whatsapp')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
