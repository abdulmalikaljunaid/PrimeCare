import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  BadgeCheck,
  Check,
  CheckCircle2,
  Droplets,
  FileText,
  FlaskConical,
  GitCompareArrows,
  Layers3,
  Plus,
  Search,
  X,
} from 'lucide-react';
import {
  catalogDocument,
  catalogFamilies,
  compatibleReagents,
  productGroups,
  products,
} from '../data/productCatalog';
import { useRfq } from '../context/RfqContext';
import './Devices.css';

const pick = (v, lang) => (typeof v === 'string' ? v : lang.startsWith('ar') ? v.ar : v.en);

const catIcons = {
  hematology: Activity,
  'blood-gas': Droplets,
  'diabetes-renal': FlaskConical,
  'catalog-families': Layers3,
};

function ProductCard({ product, lang, t }) {
  const { isInRfq, toggleRfq, isCompared, toggleCompare } = useRfq();
  const inRfq = isInRfq(product.id);
  const compared = isCompared(product.id);

  const handleRfq = () => {
    toggleRfq({
      id: product.id,
      name: product.name,
      manufacturer: product.manufacturer,
      category: pick(product.category, lang),
      type: 'product',
    });
  };

  return (
    <article className="pc-card" id={product.id}>
      <div className="pc-media">
        <span className="pc-cat">{pick(product.category, lang)}</span>
        <img
          src={product.image}
          alt={pick(product.imageAlt, lang)}
          width={product.imageWidth}
          height={product.imageHeight}
          className={`pc-img ${product.blendMultiply ? 'is-multiply' : ''}`}
          loading="lazy"
        />
      </div>

      <div className="pc-body">
        <div className="pc-head">
          <div>
            <div className="pc-maker-row">
              <span className="pc-maker mono-data">{product.manufacturer}</span>
              <span className="pc-origin">· {pick(product.origin, lang)}</span>
            </div>
            <h4 className="pc-name mono-data">{product.name}</h4>
          </div>

          <div className="pc-certs" aria-label={t('compare_row_certs')}>
            {product.certifications.map((cert) => (
              <span key={cert} className="mono-data">
                {cert}
              </span>
            ))}
          </div>
        </div>

        <p className="pc-summary">{pick(product.summary, lang)}</p>

        <ul className="pc-list">
          {product.highlights.map((item) => (
            <li key={pick(item, 'en')}>
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>{pick(item, lang)}</span>
            </li>
          ))}
        </ul>

        <dl className="pc-specs">
          {product.specs.map((item) => (
            <div key={pick(item.label, 'en')}>
              <dt>{pick(item.label, lang)}</dt>
              <dd className="tabular">{pick(item.value, lang)}</dd>
            </div>
          ))}
        </dl>

        <div className="pc-actions">
          <button
            type="button"
            className={`pc-btn ${inRfq ? 'pc-btn-added' : 'pc-btn-primary'}`}
            onClick={handleRfq}
            aria-pressed={inRfq}
          >
            {inRfq ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
            <span>{inRfq ? t('devices_in_rfq') : t('devices_add_rfq')}</span>
          </button>

          <button
            type="button"
            className={`pc-btn pc-btn-ghost ${compared ? 'is-selected' : ''}`}
            onClick={() => toggleCompare(product.id)}
            aria-pressed={compared}
          >
            <GitCompareArrows size={15} aria-hidden="true" />
            <span>{compared ? t('devices_compare_added') : t('devices_compare_add')}</span>
          </button>

          {product.documents.map((doc) => (
            <a
              key={doc.href}
              className="pc-btn pc-btn-ghost"
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={15} aria-hidden="true" />
              <span>{pick(doc.label, lang)}</span>
              <span className="pdf-size mono-data">PDF · {doc.size}</span>
            </a>
          ))}

          {product.sourceUrl && (
            <a
              className="pc-btn pc-btn-ghost"
              href={product.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeCheck size={15} aria-hidden="true" />
              <span>{t('devices_source_btn')}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function FamilyCard({ family, lang, t }) {
  const { isInRfq, toggleRfq } = useRfq();
  const inRfq = isInRfq(family.id);

  const handleRfq = () => {
    toggleRfq({
      id: family.id,
      name: pick(family.title, lang),
      manufacturer: family.manufacturer,
      category: pick(family.category, lang),
      type: 'family',
    });
  };

  return (
    <article className="fc-card" id={family.id}>
      <div className="fc-media">
        <img
          src={family.image}
          alt={pick(family.imageAlt, lang)}
          width={family.imageWidth}
          height={family.imageHeight}
          loading="lazy"
        />
      </div>
      <div className="fc-body">
        <div className="fc-category">{pick(family.category, lang)}</div>
        <h4 className="fc-title">{pick(family.title, lang)}</h4>

        <div className="fc-models">
          {family.models.map((model) => (
            <span key={model} className="mono-data">
              {model}
            </span>
          ))}
        </div>

        <ul className="fc-list">
          {family.facts.map((fact) => (
            <li key={pick(fact, 'en')}>
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>{pick(fact, lang)}</span>
            </li>
          ))}
        </ul>

        <div className="fc-actions">
          <button
            type="button"
            className={`pc-btn ${inRfq ? 'pc-btn-added' : 'pc-btn-primary'}`}
            onClick={handleRfq}
            aria-pressed={inRfq}
          >
            {inRfq ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
            <span>{inRfq ? t('devices_in_rfq') : t('devices_family_rfq')}</span>
          </button>

          <a
            className="pc-btn pc-btn-ghost"
            href={catalogDocument.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={15} aria-hidden="true" />
            <span className="pdf-size mono-data">PDF · {catalogDocument.size}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function CompareMatrix({ items, lang, t, onFinish }) {
  const { isInRfq, toggleRfq } = useRfq();

  const rows = [
    { key: 'maker', label: t('compare_row_maker'), render: (p) => <span className="mono-data">{p.manufacturer}</span> },
    { key: 'cat', label: t('compare_row_category'), render: (p) => pick(p.category, lang) },
    { key: 'tat', label: t('compare_row_turnaround'), render: (p) => <span className="tabular">{pick(p.compare.turnaround, lang)}</span> },
    { key: 'sample', label: t('compare_row_sample'), render: (p) => <span className="tabular">{pick(p.compare.sampleVolume, lang)}</span> },
    { key: 'power', label: t('compare_row_power'), render: (p) => pick(p.compare.power, lang) },
    { key: 'conn', label: t('compare_row_connectivity'), render: (p) => pick(p.compare.connectivity, lang) },
    { key: 'certs', label: t('compare_row_certs'), render: (p) => <span className="mono-data">{p.certifications.join(' · ')}</span> },
    { key: 'fit', label: t('compare_row_bestfor'), render: (p) => pick(p.compare.bestFor, lang) },
  ];

  return (
    <div className="compare-matrix" id="compare-matrix" role="region" aria-label={t('compare_title')}>
      <div className="compare-head">
        <div>
          <h3>{t('compare_title')}</h3>
          <p>{t('compare_subtitle')}</p>
        </div>
        <div className="compare-head-actions">
          <button
            type="button"
            className="pc-btn pc-btn-primary"
            onClick={onFinish}
            aria-label={t('compare_finish')}
          >
            <X size={16} aria-hidden="true" />
            <span>{t('compare_finish')}</span>
          </button>
        </div>
      </div>

      <div className="compare-scroll">
        <table className="compare-table">
          <caption className="sr-only">{t('compare_title')}</caption>
          <thead>
            <tr>
              <th scope="col" className="compare-spec-col">
                {t('compare_row_category')}
              </th>
              {items.map((p) => (
                <th key={p.id} scope="col" className="compare-device-col">
                  <div className="compare-device-head">
                    <img
                      src={p.image}
                      alt={pick(p.imageAlt, lang)}
                      width="64"
                      height="64"
                      className={p.blendMultiply ? 'is-multiply' : ''}
                    />
                    <span className="mono-data">{p.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {items.map((p) => (
                  <td key={p.id}>{row.render(p)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">{t('compare_row_action')}</th>
              {items.map((p) => {
                const added = isInRfq(p.id);
                return (
                  <td key={p.id}>
                    <button
                      type="button"
                      className={`pc-btn ${added ? 'pc-btn-added' : 'pc-btn-primary'}`}
                      onClick={() =>
                        toggleRfq({
                          id: p.id,
                          name: p.name,
                          manufacturer: p.manufacturer,
                          category: pick(p.category, lang),
                          type: 'product',
                        })
                      }
                    >
                      {added ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                      <span>{added ? t('devices_in_rfq') : t('devices_add_rfq')}</span>
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Devices = ({ activeTab, onTabChange, searchQuery, onSearchChange }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ar';
  const isRtl = lang.startsWith('ar');
  const { compareIds, compareOpen, setCompareOpen, clearCompare, isInRfq, toggleRfq } = useRfq();
  const tabRefs = useRef([]);

  const categories = useMemo(
    () => [
      ...productGroups.map((g) => ({ ...g, type: 'products', count: g.productIds.length })),
      {
        id: 'catalog-families',
        title: { ar: t('devices_tab_families_title'), en: t('devices_tab_families_title') },
        description: { ar: t('devices_tab_families_desc'), en: t('devices_tab_families_desc') },
        type: 'families',
        count: catalogFamilies.length,
      },
    ],
    [t],
  );

  const normalizedQuery = (searchQuery || '').trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filteredProducts = useMemo(() => {
    if (!isSearching) return [];
    return products.filter((p) => {
      const hay = [
        p.name,
        p.manufacturer,
        p.category.ar,
        p.category.en,
        p.summary.ar,
        p.summary.en,
        p.keywords,
        ...p.certifications,
        ...p.specs.map((s) => `${s.label.ar} ${s.label.en} ${s.value.ar} ${s.value.en}`),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [isSearching, normalizedQuery]);

  const filteredFamilies = useMemo(() => {
    if (!isSearching) return [];
    return catalogFamilies.filter((f) => {
      const hay = [
        f.title.ar,
        f.title.en,
        f.manufacturer,
        f.category.ar,
        f.category.en,
        ...f.models,
        ...f.facts.map((x) => `${x.ar} ${x.en}`),
        f.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [isSearching, normalizedQuery]);

  const reagentsMatchSearch = useMemo(() => {
    if (!isSearching) return false;
    const hay = [
      compatibleReagents.title.ar,
      compatibleReagents.title.en,
      compatibleReagents.description.ar,
      compatibleReagents.description.en,
      ...compatibleReagents.systems,
      'reagent reagents كواشف محاليل',
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(normalizedQuery);
  }, [isSearching, normalizedQuery]);

  const activeGroup = productGroups.find((g) => g.id === activeTab);
  const isFamiliesTab = activeTab === 'catalog-families';
  const activeProducts = activeGroup
    ? activeGroup.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)
    : [];

  const comparedProducts = useMemo(
    () => compareIds.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [compareIds],
  );

  const showReagents = isSearching
    ? reagentsMatchSearch
    : activeTab === 'hematology' || activeTab === 'catalog-families';

  const totalModels = products.length + catalogFamilies.reduce((sum, f) => sum + f.models.length, 0);
  const reagentsInRfq = isInRfq(compatibleReagents.id);

  const handleTabKeyDown = (e, idx) => {
    const count = categories.length;
    let next = null;
    if (e.key === 'ArrowDown' || (!isRtl && e.key === 'ArrowRight') || (isRtl && e.key === 'ArrowLeft')) {
      next = (idx + 1) % count;
    } else if (e.key === 'ArrowUp' || (!isRtl && e.key === 'ArrowLeft') || (isRtl && e.key === 'ArrowRight')) {
      next = (idx - 1 + count) % count;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = count - 1;
    }
    if (next !== null) {
      e.preventDefault();
      onTabChange(categories[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section className="section devices-section" id="devices">
      <div className="container">
        <div className="section-header-split devices-top">
          <div>
            <h2>{t('devices_heading')}</h2>
            <p>{t('devices_subtitle')}</p>
          </div>

          <dl className="catalog-summary" aria-label={t('devices_heading')}>
            <div>
              <dd className="mono-data">{products.length}</dd>
              <dt>{t('devices_stat_flagship')}</dt>
            </div>
            <div>
              <dd className="mono-data">{catalogFamilies.length}</dd>
              <dt>{t('devices_stat_families')}</dt>
            </div>
            <div>
              <dd className="mono-data">{totalModels}+</dd>
              <dt>{t('devices_stat_models')}</dt>
            </div>
          </dl>
        </div>

        {/* Search & Compare toolbar */}
        <div className="workbench-toolbar">
          <div className="search-field">
            <label htmlFor="catalog-search" className="sr-only">
              {t('devices_search_label')}
            </label>
            <Search size={18} className="search-icon" aria-hidden="true" />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('devices_search_ph')}
              className="search-input"
            />
            {isSearching && (
              <button
                type="button"
                className="search-clear"
                onClick={() => onSearchChange('')}
                aria-label={t('devices_search_clear')}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          {comparedProducts.length > 0 && (
            <button
              type="button"
              className="btn btn-gold compare-toggle-btn"
              onClick={() => setCompareOpen((v) => !v)}
              aria-expanded={compareOpen}
              aria-controls="compare-matrix"
            >
              <GitCompareArrows size={16} aria-hidden="true" />
              <span>
                {t('compare_open_btn')} ({comparedProducts.length})
              </span>
            </button>
          )}
        </div>

        {/* Inline Side-by-Side Comparison Matrix */}
        {compareOpen && comparedProducts.length > 0 && (
          <CompareMatrix
            items={comparedProducts}
            lang={lang}
            t={t}
            onFinish={clearCompare}
          />
        )}

        {/* Search Results OR Specialty Tabs */}
        {isSearching ? (
          <div className="search-results-panel" aria-live="polite">
            <div className="panel-head">
              <h3>
                {t('devices_search_results')} ({filteredProducts.length + filteredFamilies.length})
              </h3>
              <button type="button" className="pc-btn pc-btn-ghost" onClick={() => onSearchChange('')}>
                {t('devices_search_clear')}
              </button>
            </div>

            {filteredProducts.length === 0 && filteredFamilies.length === 0 && !reagentsMatchSearch ? (
              <div className="empty-state">
                <h4>{t('devices_no_results_title')}</h4>
                <p>{t('devices_no_results_desc')}</p>
              </div>
            ) : (
              <>
                {filteredProducts.length > 0 && (
                  <div className="pc-grid">
                    {filteredProducts.map((p) => (
                      <ProductCard key={p.id} product={p} lang={lang} t={t} />
                    ))}
                  </div>
                )}

                {filteredFamilies.length > 0 && (
                  <div className="fc-grid" style={{ marginBlockStart: filteredProducts.length ? '1.25rem' : 0 }}>
                    {filteredFamilies.map((f) => (
                      <FamilyCard key={f.id} family={f} lang={lang} t={t} />
                    ))}
                  </div>
                )}
              </>
            )}

            {showReagents && (
              <aside className="reagents-box">
                <div className="reagents-copy">
                  <h4>{pick(compatibleReagents.title, lang)}</h4>
                  <p>{pick(compatibleReagents.description, lang)}</p>
                  <div className="reagents-tags">
                    {compatibleReagents.systems.map((sys) => (
                      <span key={sys} className="mono-data">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className={`pc-btn ${reagentsInRfq ? 'pc-btn-added' : 'pc-btn-primary'}`}
                  onClick={() =>
                    toggleRfq({
                      id: compatibleReagents.id,
                      name: pick(compatibleReagents.title, lang),
                      manufacturer: 'B&E Bio-Technology',
                      category: t('pillar_2_title'),
                      type: 'reagents',
                    })
                  }
                >
                  {reagentsInRfq ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                  <span>{reagentsInRfq ? t('devices_in_rfq') : t('devices_reagents_rfq')}</span>
                </button>
              </aside>
            )}
          </div>
        ) : (
          <div className="workbench-grid">
            <div className="tabs-column">
              <div className="mobile-scroll-note" aria-hidden="true">
                {t('devices_mobile_scroll_hint')}
              </div>
              <div className="specialty-tabs" role="tablist" aria-label={t('devices_tabs_label')}>
                {categories.map((cat, idx) => {
                  const Icon = catIcons[cat.id] || Layers3;
                  const selected = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      id={`tab-${cat.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="catalog-active-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => onTabChange(cat.id)}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                      className={`specialty-tab ${selected ? 'is-active' : ''}`}
                    >
                      <span className="tab-icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span className="tab-copy">
                        <strong>{pick(cat.title, lang)}</strong>
                        <span>{pick(cat.description, lang)}</span>
                      </span>
                      <span className="tab-count mono-data">{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="workbench-panel"
              id="catalog-active-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
            >
              {!isFamiliesTab ? (
                <>
                  <div className="panel-head">
                    <div>
                      <h3>{activeGroup ? pick(activeGroup.title, lang) : ''}</h3>
                      <p>{activeGroup ? pick(activeGroup.description, lang) : ''}</p>
                    </div>
                    <span className="panel-count mono-data">
                      {activeProducts.length} {t('devices_unit_device')}
                    </span>
                  </div>

                  <div className="pc-grid">
                    {activeProducts.map((product) => (
                      <ProductCard key={product.id} product={product} lang={lang} t={t} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="panel-head">
                    <div>
                      <h3>{t('devices_tab_families_title')}</h3>
                      <p>{t('devices_tab_families_desc')}</p>
                    </div>
                    <a
                      className="pc-btn pc-btn-primary"
                      href={catalogDocument.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText size={15} aria-hidden="true" />
                      <span>{t('devices_open_catalogue')}</span>
                      <span className="pdf-size mono-data">PDF · {catalogDocument.size}</span>
                    </a>
                  </div>

                  <div className="fc-grid">
                    {catalogFamilies.map((family) => (
                      <FamilyCard key={family.id} family={family} lang={lang} t={t} />
                    ))}
                  </div>
                </>
              )}

              {showReagents && (
                <aside className="reagents-box">
                  <div className="reagents-copy">
                    <h4>{pick(compatibleReagents.title, lang)}</h4>
                    <p>{pick(compatibleReagents.description, lang)}</p>
                    <div className="reagents-tags">
                      {compatibleReagents.systems.map((sys) => (
                        <span key={sys} className="mono-data">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`pc-btn ${reagentsInRfq ? 'pc-btn-added' : 'pc-btn-primary'}`}
                    onClick={() =>
                      toggleRfq({
                        id: compatibleReagents.id,
                        name: pick(compatibleReagents.title, lang),
                        manufacturer: 'B&E Bio-Technology',
                        category: t('pillar_2_title'),
                        type: 'reagents',
                      })
                    }
                  >
                    {reagentsInRfq ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                    <span>{reagentsInRfq ? t('devices_in_rfq') : t('devices_reagents_rfq')}</span>
                  </button>
                </aside>
              )}

              <p className="source-note">{t('devices_spec_disclaimer')}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
