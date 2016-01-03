/**
 * this file is for auth with firebaseRef
 */
import { firebaseRef } from '../index';

const NEWUSER = 'INVALID_USER';

// function authHandler(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//     if (error.code === NEWUSER) {
//       console.log('new user');
//     } else if (error.code === WRONGPASS) {
//       console.log('wrong pass');
//     }
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// }

function processUserEmail(user) {
  if (user.id.indexOf('@daiict.ac.in') > -1) {
    return user;
  } else {
    return {
      id: user.id + '@daiict.ac.in',
      pass: user.pass,
    };
  }
}

function createUser(user) {
  return new Promise((res, rej) => firebaseRef.createUser({
    email: user.id,
    password: user.pass,
  }, (error, userData) => {
    if (error) {
      switch (error.code) {
        case 'EMAIL_TAKEN':
          console.debug('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          console.debug('The specified email is not a valid email.');
          break;
        default:
          console.debug('Error creating user:', error);
      }
      return rej(error);
    } else {
      console.debug('Successfully created user account with uid:', userData.uid);
      return res(userData);
    }
  }));
}

function authenticateUser(user) {
  return new Promise((resolve, reject) => {
    return firebaseRef.authWithPassword({
      email: user.id,
      password: user.pass,
    }, (error, authData) => {
      if (error) {
        return reject(error);
      }
      return resolve(authData);
    });
  });
}

export function login(user) {
  const safeUser = processUserEmail(user);
  return Promise.resolve(safeUser)
  .then(authenticateUser)
  .catch(error => {
    if (error.code === NEWUSER) {
      return createUser(safeUser).then(() => authenticateUser(safeUser));
    } else {
      throw error;
    }
  });
}
