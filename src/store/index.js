import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import counter from './reducers/counter';
import user from './reducers/user';
import clientRequest from '../client/request';
import serverRequest from '../server/request';
import auth from './reducers/auth';

export function getClientStore() {
  const initialState = window.context.state;
  const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
      history: createBrowserHistory(),
    });

  const reducers = {
    counter,
    user,
    auth,
    router: routerReducer,
  };

  const combinedReducers = combineReducers(reducers);

  const store = applyMiddleware(
    thunk.withExtraArgument(clientRequest),
    promise,
    routerMiddleware,
    logger
  )(createStore)(combinedReducers, initialState);

  const history = createReduxHistory(store);

  return { store, history };
}

export function getServerStore(req) {
  const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
      history: createMemoryHistory(),
    });

  const reducers = {
    counter,
    user,
    auth,
    router: routerReducer,
  };
  const combinedReducers = combineReducers(reducers);

  const store = applyMiddleware(
    thunk.withExtraArgument(serverRequest(req)),
    promise,
    routerMiddleware,
    logger
  )(createStore)(combinedReducers);

  const history = createReduxHistory(store);

  return { store, history };
}
