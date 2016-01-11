import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './state/reducers';
import db from './localdb/indexdb';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import isMobileFunc from './helper/isMobile';

if (isMobileFunc()) {
  injectTapEventPlugin(700);
} else {
  injectTapEventPlugin();
}
// throw new Error('is it owrking');
// window.onerror("TestRollbarError: testing window.onerror", window.location.href);
const store = createStore(reducers);

function handleChange() {
  // console.log(store.getState());
}

store.subscribe(handleChange);
const node = document.createElement('div');
node.setAttribute('id', 'node');
node.setAttribute('class', 'noscroll');
document.body.appendChild(node);

// DB promise, resolves if db connection established
const dbPromise = db.createDB();
render(
  <Provider store = {store}>
    <App dbPromise={dbPromise}/>
  </Provider>,
  node
);

console.log('hello world!, visit https://github.com/kepta/daintranet .');
