import React from 'react';
import { useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import Header from './component/Header';
import { Provider } from 'react-redux';
import { getStore } from './store';

const store = getStore();

function App() {
  return (
    <Provider store={store}>
      <Header />
      {useRoutes(routesConfig)}
    </Provider>
  );
}

export default App;
