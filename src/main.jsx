import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n';
import { LanguageProvider } from './context/LanguageContext';
import { RfqProvider } from './context/RfqContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RfqProvider>
        <App />
      </RfqProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
