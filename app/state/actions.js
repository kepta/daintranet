export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function setLogging() {
  return {
    type: LOGGING,
  };
}
export function setLogout() {
  return {
    type: LOGGED_OUT,
  };
}
export function setLoggedIn() {
  return {
    type: LOGGED_IN,
  };
}
export function setLoginError() {
  return {
    type: LOGIN_ERROR,
  };
}

export const Actions = {
  setLoggedIn,
  setLogout,
  setLogging,
  setLoginError,
};
