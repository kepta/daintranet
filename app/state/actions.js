export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
/**
 * @function setLogggin
 * causes localStorage to set user
 * and save item
 */
export function setLogging(user) {
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: LOGGING,
    ...user,
  };
}
export function setLogout() {
  localStorage.setItem('user', null);
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
  localStorage.setItem('user', null);
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
