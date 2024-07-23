import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory, createMemoryHistory } from 'history';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
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
  const combinedReducer = combineReducers(reducers);

  const store = applyMiddleware(
    thunk.withExtraArgument(clientRequest),
    promise,
    routerMiddleware,
    logger
  )(createStore)(combinedReducer, initialState);

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
  const combinedReducer = combineReducers(reducers);

  const store = applyMiddleware(
    thunk.withExtraArgument(serverRequest(req)),
    promise,
    routerMiddleware,
    logger
  )(createStore)(combinedReducer);

  const history = createReduxHistory(store);

  return { store, history };
}
