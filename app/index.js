// import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './state/reducers';
import App from './app';

const store = createStore(reducers);

function handleChange() {
  console.log(store.getState());
}

store.subscribe(handleChange);
const node = document.createElement('div');
document.body.appendChild(node);

render(
  <Provider store = {store}> <App/> </Provider>,
  node
);
