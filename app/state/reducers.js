import { combineReducers } from 'redux';
import {
        LOGGED_IN,
        LOGGED_OUT,
        LOGGING,
        LOGIN_ERROR,
        WINDOW_SET,
      } from './actions';
import { isLoggedIn, firebaseRef } from '../network/auth';

/**
 * Get the user from local storage
 * decide whether login state is needed
 * or we have credentials
 */
const loggedIn = isLoggedIn();

let jwt = null;
if (loggedIn) {
  jwt = localStorage.getItem('firebase:jwt::amber-heat-8849');
  jwt = atob(jwt);
  jwt = jwt.slice(loggedIn.token.length);
  console.debug('resuming state of', loggedIn.password.email);
}
const initialLoginState = loggedIn ? {
  STATUS: LOGGING,
  ID: loggedIn.password.email,
  PASS: jwt,
} : {
  STATUS: LOGGED_OUT,
  ID: null,
  PASS: jwt,
};
const windowsState = {
  email: true,
  intranet: true,
};

// initialState.loginState = initialLoginState
function windows(state = windowsState, action) {
  switch (action.type) {
    case WINDOW_SET:
      return Object.assign({}, state, {
        email: action.email,
        intranet: action.intranet,
      });
    default:
      return state;
  }
  return Object.assign({}, state, {
    email: action.email,
    intranet: action.intranet,
  });
}

function login(state = initialLoginState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    case LOGGING:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: action.id,
        PASS: action.pass,
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    default:
      return state;
  }
}

const reducer = combineReducers({ login, windows });
export default reducer;
