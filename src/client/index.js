import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { getClientStore } from '../store';
import App from '../App';

const root = document.getElementById('root');

const { store, history } = getClientStore();

hydrateRoot(
  root,
  <Router history={history}>
    <App store={store} />
  </Router>
);
