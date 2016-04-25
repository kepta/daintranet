import login, { logout } from '../network/auth';
import { setPass } from '../network/pass';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SESSION_RESUME = 'SESSION_RESUME';

export function setLogging(user) {
  return {
    type: LOGGING,
  };
}

export function setLoggedIn(authData, user) {
  setPass(authData.token, user.pass);
  return {
    type: LOGGED_IN,
    authid: authData.uid,
  };
}


export function setLoginError(error) {
  logout();
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function setLogout() {
  logout();
  return {
    type: LOGGED_OUT,
  };
}

export function setCredentials(user) {
  return {
    type: SET_CREDENTIALS,
    ...user,
  };
}

export function sessionResume(authData, pass) {
  return {
    type: SESSION_RESUME,
    ...authData,
    pass,
  }
}
export function verifyUser(user) {
  return dispatch => {
    dispatch(setLogging(user));
    return login(user)
      .then((authData) => dispatch(setLoggedIn(authData, user)))
      .catch((error) => dispatch(setLoginError(error)));
  };
}
