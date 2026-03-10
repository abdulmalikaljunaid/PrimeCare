import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Statistics } from './components/Statistics';
import { ServicesPreview } from './components/ServicesPreview';
import { Partners } from './components/Partners';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function App() {
  useTranslation(); // just to suspend/load languages if necessary

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Statistics />
        <ServicesPreview />
        <Partners />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
