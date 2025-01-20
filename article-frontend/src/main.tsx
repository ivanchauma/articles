import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
//import './index.css'
import App from './App.js'

import { store } from './store.js';  // Assuming your store is in ./store
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
