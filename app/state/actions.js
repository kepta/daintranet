export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const WINDOW_SET = 'WINDOW_SET';

import { firebaseRef } from '../network/auth';

/**
 * @function setLogggin
 * causes localStorage to set user
 * and save item
 */
export function setLogging(user) {
  localStorage.removeItem('user');
  return {
    type: LOGGING,
    ...user,
  };
}
export function setLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('firebase:jwt::amber-heat-8849');
  firebaseRef.unauth();
  return {
    type: LOGGED_OUT,
  };
}
export function setLoggedIn() {
  return {
    type: LOGGED_IN,
  };
}

export function setWindows() {
  return {
    type: WINDOW_SET,
  };
}
export function setLoginError() {
  firebaseRef.unauth();
  localStorage.removeItem('user');
  localStorage.removeItem('firebase:jwt::amber-heat-8849');
  return {
    type: LOGIN_ERROR,
  };
}

export const Actions = {
  setLoggedIn,
  setLogout,
  setLogging,
  setLoginError,
  setWindows,
};
