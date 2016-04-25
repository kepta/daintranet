import Firebase from 'firebase';
import { fetchInbox } from './webmail';

export const firebaseRef = new Firebase('https://amber-heat-8849.firebaseio.com');

export function isLoggedIn() {
  const authData = firebaseRef.getAuth();
  if (authData) {
    return authData;
  } else {
    return false;
  }
}

export function logout() {
  firebaseRef.unauth();
  window.onunload = undefined;
  localStorage.removeItem('firebase:jwt::amber-heat-8849');
  localStorage.removeItem('redux1');
}

function createUser(user) {
  return new Promise((res, rej) => firebaseRef.createUser({
    email: user.id,
    password: user.pass,
  }, (error, userData) => {
    if (error) {
      switch (error.code) {
        case 'EMAIL_TAKEN':
          break;
        case 'INVALID_EMAIL':
          break;
        default:
      }
      return rej(error);
    } else {
      return res(userData.uid);
    }
  }));
}


function authenticateUser(user) {
  return new Promise((resolve, reject) => {
    firebaseRef.authWithPassword({
      email: user.id,
      password: user.pass,
    }, (error, authData) => {
      if (error) {
        switch (error.code) {
          case 'INVALID_EMAIL':
            break;
          case 'INVALID_PASSWORD':
            break;
          case 'INVALID_USER':
            break;
          default:
        }
        return reject(error.code);
      } else {
        return resolve(authData);
      }
    });
  });
}

export default function login(user) {
  const index = user.id.indexOf('@');
  if (index=== -1) {
    user.id = `${user.id}@daiict.ac.in`;
  }

  const promise = Promise.resolve(user);

  return promise.then(authenticateUser)
  .catch((error) => {
    if (error === 'INVALID_USER') {
      return fetchInbox({ ID: user.id, PASS: user.pass })
        .then(createUser.bind(this, user))
        .then(authenticateUser.bind(this, user));
    } else {
      return Promise.reject(error);
    }
  });
}
