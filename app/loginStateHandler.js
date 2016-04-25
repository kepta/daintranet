import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGGING,
  LOGIN_ERROR,
} from './redux/loginActions';

// parameters for this function give where to redirect route to
// eg if parameter loggedIn = '/'
// if case matches this it will go to '/'
// if no argument is specified default route would be returned

export function decideRoute(status, loggedIn, loggedOut, logging, loginError) {
  const _loggedIn = loggedIn || '/';
  const _loggedOut = loggedOut || '/login';
  const _logging = logging || '/loading';
  const _loginError = loginError || '/login';
  switch (status) {
    case LOGGED_IN:
      return _loggedIn;
    case LOGGED_OUT:
      return _loggedOut;
    case LOGGING:
      return _logging;
    case LOGIN_ERROR:
      return _loginError;
    default:
      return _loggedOut;
  }
}
