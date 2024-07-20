import React from 'react';
import { useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import Header from './component/Header';
import { Provider } from 'react-redux';
import useStyles from 'isomorphic-style-loader-react18/useStyles';
import actionCreators from './store/actionCreators/auth';

import styles from './App.css';

// function App({ store }) {
//   useStyles(styles);
//   return (
//     <Provider store={store}>
//       <Header />
//       {useRoutes(routesConfig)}
//       <footer className={styles.theme}>this is footer</footer>
//     </Provider>
//   );
// }

// App.loadData = (store) => {
//   return store.dispatch(actionCreators.validate());
// };

function App() {
  return useRoutes(routesConfig);
}

export default App;
