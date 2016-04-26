import Firebase from 'firebase';
import { fetchInbox } from './webmail';
const date = new Date();
export const firebaseRef = new Firebase('https://amber-heat-8849.firebaseio.com');
const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;
const dateStringYest = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;

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

export function loginIncrement() {
  const auth = firebaseRef.getAuth();
  console.log('incrementing', auth);

  const target = firebaseRef.child('users').child(auth.uid);
  target.child('email').transaction(currentData => {
    return (currentData || auth.password.email);
  });
  target.child(dateString).transaction((currentData) => {
    return (currentData || 0) + 1;
  }, (e) => {
    if (e) {
      console.error('loginincrement', e);
    }
  });
}


export function rateApp(rating, feedback) {
  const auth = firebaseRef.getAuth();
  if (!auth) {
    return;
  }
  if (!rating && !feedback) {
    return;
  }

  console.log('rating', rating, feedback);
  const target = firebaseRef.child('feedback').child(auth.password.email.slice(0, 9));

  target.transaction(() => {
    return { rating, feedback}
  }, (e) => {
    if (e) {
      console.error('loginincrement', e);
    }
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
