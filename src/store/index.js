import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import counter from './reducers/counter';
import user from './reducers/user';
import clientRequest from '../client/request';
import serverRequest from '../server/request';

const reducers = {
  counter,
  user,
};
const combinedReducer = combineReducers(reducers);

export function getClientStore() {
  const initialState = window.context.state;
  const store = applyMiddleware(
    thunk.withExtraArgument(clientRequest),
    promise,
    logger
  )(createStore)(combinedReducer, initialState);
  return store;
}

export function getServerStore() {
  const store = applyMiddleware(
    thunk.withExtraArgument(serverRequest),
    promise,
    logger
  )(createStore)(combinedReducer);
  return store;
}
