import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HelmetProvider} from 'react-helmet-async'
import { StoreProvider } from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <StoreProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StoreProvider>
    </React.StrictMode>
  
);

reportWebVitals();
