import { combineReducers } from 'redux';
import { LOGGED_IN, LOGGED_OUT, LOGGING, LOGIN_ERROR } from './actions';

/**
 * Get the user from local storage
 * decide whether login state is needed
 * or we have credentials
 */

const user = JSON.parse(localStorage.getItem('user'));
// const initialState = {};
const initialLoginState = user !== null ? {
  STATUS: LOGGING,
  ID: user.id,
  PASS: user.pass,
} : {
  STATUS: LOGGED_OUT,
  ID: null,
  PASS: null,
};
// initialState.loginState = initialLoginState
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
// const initialMailState = {};
//
// function inbox(state = initialMailState, action) {
//   switch (action.type) {
//     case
//   }
// }

const reducer = combineReducers({ login });
export default reducer;
