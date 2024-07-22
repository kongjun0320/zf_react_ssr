import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getClientStore } from '../store';
import App from '../App';

const root = document.getElementById('root');

const store = getClientStore();

hydrateRoot(
  root,
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>
);
