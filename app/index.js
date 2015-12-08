import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './state/reducers';
import db from './localdb/indexdb';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const store = createStore(reducers);

function handleChange() {
  console.log(store.getState());
}

store.subscribe(handleChange);
const node = document.createElement('div');
document.body.appendChild(node);

// DB promise, resolves if db connection established
const dbPromise = db.createDB();
render(
  <Provider store = {store}>
    <App dbPromise={dbPromise}/>
  </Provider>,
  node
);

console.log('helo world');
