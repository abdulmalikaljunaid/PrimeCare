import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import './Contact.css';

export const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Format message for WhatsApp
    const whatsappNumber = "967712828000";
    const text = encodeURIComponent(`*طلب تواصل جديد من موقع Prime Care*\n\n*الاسم:* ${name}\n*البريد الإلكتروني:* ${email}\n*الرسالة أو الاستفسار:*\n${message}`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message on the site
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    e.target.reset(); // Optional: reset form fields
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="section-title text-gradient">{t('nav_contact')}</h2>
          <p className="section-subtitle">{t('contact_subtitle', 'Get in touch with our team today')}</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info glass">
            <h3>{t('contact_info', 'Contact Information')}</h3>
            <p className="text-muted mb-4">{t('contact_desc', 'Our support team is available 24/7 to assist you.')}</p>
            
            <div className="contact-item">
              <div className="contact-icon"><Phone size={20} /></div>
              <div>
                <p className="font-bold">{t('phone', 'Phone')}</p>
                <p className="text-muted" dir="ltr">+967 712 828 000</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon"><Mail size={20} /></div>
              <div>
                <p className="font-bold">{t('email', 'Email')}</p>
                <p className="text-muted">info@primecare.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div>
                <p className="font-bold">{t('location', 'Location')}</p>
                <p className="text-muted">{t('location_desc', 'Riyadh, Saudi Arabia')}</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form glass">
            <h3>{t('send_message', 'Send a Message')}</h3>
            {isSubmitted ? (
              <div className="success-message text-center">
                <CheckCircle2 size={64} className="success-icon" />
                <h4>{t('success_title', 'Message Sent!')}</h4>
                <p className="text-muted">{t('success_desc', 'Thank you for contacting Prime Care. We will reply to your WhatsApp shortly.')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{t('form_name', 'Full Name')}</label>
                  <input type="text" name="name" className="form-input" placeholder={t('form_name', 'Full Name')} required />
                </div>
                <div className="form-group">
                  <label>{t('form_email', 'Email Address')}</label>
                  <input type="email" name="email" className="form-input" placeholder="example@email.com" required />
                </div>
                <div className="form-group">
                  <label>{t('form_message', 'Message')}</label>
                  <textarea name="message" className="form-input" rows="4" placeholder={t('form_message_ph', 'How can we help you?')} required></textarea>
                </div>
                <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                  {t('submit_form', 'Send Message')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
