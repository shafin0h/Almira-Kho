// Ensure window.fetch has a setter so extensions can safely attach interceptors
try {
  let _currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
  Object.defineProperty(window, 'fetch', {
    get() {
      return _currentFetch;
    },
    set(val) {
      _currentFetch = val;
    },
    configurable: true,
    enumerable: true,
  });
} catch (_) {}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
