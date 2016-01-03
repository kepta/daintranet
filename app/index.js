import React from 'react';
import Firebase from 'firebase';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './state/reducers';
import db from './localdb/indexdb';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import isMobileFunc from './helper/isMobile';
// import './helper/noBounce';

const FIREBASE = 'https://amber-heat-8849.firebaseio.com/';
export const firebaseRef = new Firebase(FIREBASE);
var authData = firebaseRef.getAuth();
if (authData) {
  console.log("User " + authData.uid + " is logged in with " + authData.provider);
} else {
  console.log("User is logged out");
}
if (isMobileFunc()) {
  injectTapEventPlugin();
} else {
  injectTapEventPlugin();
}

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
