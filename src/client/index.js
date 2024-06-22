import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import App from '../App';
import { getClientStore } from '../store';

const root = document.getElementById('root');

const { store, history } = getClientStore();

hydrateRoot(
  root,
  <Router history={history}>
    <App store={store} />
  </Router>
);
