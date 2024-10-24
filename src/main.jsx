// main.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import App from './App.jsx';
import './index.css';
import store, { persistor } from './store.js'; // Import store and persistor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      {/* PersistGate ensures Redux state is restored before rendering */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);
