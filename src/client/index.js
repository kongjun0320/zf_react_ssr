import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import StyleContext from 'isomorphic-style-loader-react18/StyleContext';

import App from '../App';
import { getClientStore } from '../store';

const root = document.getElementById('root');

const { store, history } = getClientStore();

const insertCss = (...styles) => {
  const removeCSS = styles.map((style) => style._insertCss());
  return () => removeCSS.forEach((dispose) => dispose());
};

hydrateRoot(
  root,
  <Router history={history}>
    <StyleContext.Provider value={{ insertCss }}>
      <App store={store} />
    </StyleContext.Provider>
  </Router>
);
