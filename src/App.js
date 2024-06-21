import React from 'react';
import { useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import Header from './component/Header';
import { Provider } from 'react-redux';

function App({ store }) {
  return (
    <Provider store={store}>
      <Header />
      {useRoutes(routesConfig)}
    </Provider>
  );
}

export default App;
