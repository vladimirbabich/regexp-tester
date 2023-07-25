import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store as ToolkitStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
