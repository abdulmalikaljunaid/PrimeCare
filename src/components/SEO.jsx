import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const setMeta = (selector, attrName, attrValue, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const SEO = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t('seo.title');
    const description = t('seo.description');

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [t, i18n.language]);

  return null;
};

export default SEO;
