import React from 'react';
import { hydrateRoot } from 'react-dom/client';
// import { HistoryRouter as Router } from 'redux-first-history/rr6';
// import StyleContext from 'isomorphic-style-loader-react18/StyleContext';

// import App from '../App';
// import { getClientStore } from '../store';
// import Counter from '../routes/Counter';
import App from '../App';
import { BrowserRouter, HistoryRouter as Router } from 'react-router-dom';

const root = document.getElementById('root');

// const { store, history } = getClientStore();

// const insertCss = (...styles) => {
//   const removeCSS = styles.map((style) => style._insertCss());
//   return () => removeCSS.forEach((dispose) => dispose());
// };

hydrateRoot(
  root,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// hydrateRoot(
//   root,
//   <Router history={history}>
//     <StyleContext.Provider value={{ insertCss }}>
//       <App store={store} />
//     </StyleContext.Provider>
//   </Router>
// );
