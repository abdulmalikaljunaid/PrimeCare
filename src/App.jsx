import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Statistics } from './components/Statistics';
import { ServicesPreview } from './components/ServicesPreview';
import { Devices } from './components/Devices';
import { Partners } from './components/Partners';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RfqTray } from './components/RfqTray';
import { productGroups } from './data/productCatalog';

function App() {
  useTranslation();
  const [activeCatalogTab, setActiveCatalogTab] = useState(productGroups[0]?.id || 'hematology');
  const [catalogSearch, setCatalogSearch] = useState('');

  const handleNavigateCatalog = (tabId) => {
    setCatalogSearch('');
    setActiveCatalogTab(tabId);
  };

  const handleFilterManufacturer = (term) => {
    setCatalogSearch(term);
  };

  return (
    <div className="app-container">
      <SEO />
      <Navbar />
      <main id="main-content">
        <Hero onInspectDevice={handleNavigateCatalog} />
        <About />
        <Statistics />
        <ServicesPreview onNavigateCatalog={handleNavigateCatalog} />
        <Devices
          activeTab={activeCatalogTab}
          onTabChange={setActiveCatalogTab}
          searchQuery={catalogSearch}
          onSearchChange={setCatalogSearch}
        />
        <Partners onFilterManufacturer={handleFilterManufacturer} />
        <Testimonials />
        <Contact />
      </main>
      <Footer onNavigateCatalog={handleNavigateCatalog} />
      <RfqTray />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
