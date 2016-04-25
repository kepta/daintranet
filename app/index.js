import './bootstrap/css/bootstrap.min.css';
import './main.css';
console.log('hekkllo world');
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import App from './App';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Immutable from 'immutable';
let oldState;

// toggle this to switch off persistence
const persistence = undefined; // false;

// try {
//   oldState = { reducer: JSON.parse(localStorage.getItem('redux1'), (k, v) => {
//     if (k === 'tree' || k === 'location' || k === 'search' || k === 'quickSearch' || k === 'inbox' || k === 'fav') {
//       return Immutable.fromJS(v);
//     }
//     return v;
//   }) };
// } catch (e) {
//   if (e) {
//     oldState = undefined;
//   }
// } finally {
//   if (!oldState.reducer) {
//     oldState = undefined;
//   }
// }
let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger');
  const loggerMiddleware = createLogger();
  middleware = [...middleware, loggerMiddleware];
}

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer,
  }),
  persistence && oldState,
  compose(
    applyMiddleware(
      ...middleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// window.onunload = () => {
//   localStorage.setItem('redux1', JSON.stringify(store.getState().reducer));
// };
//
// window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
//   window.onunload = undefined;
//   localStorage.removeItem('redux1');
//   // location.reload();
//   return false;
// };

const history = syncHistoryWithStore(browserHistory, store);
const node = document.getElementById('app');

render(
  <Provider store = {store}>
      <App history={history} />
  </Provider>,
  node
);
