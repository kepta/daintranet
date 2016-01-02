import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './state/reducers';
import db from './localdb/indexdb';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import isMobileFunc from './helper/isMobile';
// import './helper/noBounce';

if (isMobileFunc()) {
  injectTapEventPlugin();
} else {
  injectTapEventPlugin();
}
function preventDefault(e) {
  // e = e || window.event;
  e.preventDefault();
  e.returnValue = false;
  document.activeElement.blur();
  document.getElementById('scroller').focus();

  // console.log(document.getElementById('scroller'));
  // console.log('here', e, document.activeElement);
}
//
// const fixed = document.getElementById('node');
// fixed.addEventListener('touchmove', function(e) {
//   e.preventDefault();
//   fixed.blur();
//   document.getElementById('scroller').focus();
//   console.log('moving');
// }, false);
// window.addEventListener('scroll', preventDefault, false);

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
