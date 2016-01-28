/**
 * this file is for auth with firebaseRef
 */
import Firebase from 'firebase';
import { getInbox } from './Fetch';
const NEWUSER = 'INVALID_USER';

const FIREBASE = 'https://amber-heat-8849.firebaseio.com/';
export const firebaseRef = new Firebase(FIREBASE);

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
          console.log('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          console.log('The specified email is not a valid email.');
          break;
        default:
          console.log('Error creating user:', error);
      }
      return rej(error);
    } else {
      console.log('Successfully created user account with uid:', userData.uid);
      return res(userData);
    }
  }));
}
function setKeys(user, uid, ref) {
  // console.log('setting keys');
  ref.child('users').child(uid).set({
    collegeId: user.id,
    key: user.pass,
  }, e => {
    console.log(e);
  });
}
function readUserData(authData) {
  console.log('reading user', authData);
  return new Promise((res, rej) => {
    firebaseRef.child('users').child(authData.uid).once('value', (snapshot) => {
      console.log(snapshot.val());
      res(snapshot.val());
    }, (errorObject) => {
      console.log(errorObject);
      rej(errorObject);
    });
  });
}
function authenticateUser(user) {
  console.log('authenticating user');
  return new Promise((resolve, reject) => {
    return firebaseRef.authWithPassword({
      email: user.id,
      password: user.pass,
    }, (error, authData) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      try {
        localStorage.setItem('firebase:jwt::amber-heat-8849', btoa(authData.token + user.pass));
      } catch (e) {
        if (e) {
          return reject(e);
        }
      }
      console.log('login success');
      return resolve(authData);
    });
  });
}
export function isLoggedIn() {
  const authData = firebaseRef.getAuth();
  if (authData) {
    return authData;
  } else {
    return false;
  }
}
export function login(user) {
  // Get a database reference to our posts
// var ref = new firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");

// // Attach an asynchronous callback to read the data at our posts reference
// firebaseRef.child('users').child('e730e2b0-0f6d-45da-bd46-46a60a9154a').on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });
  // firebaseRef.child('users').child('e730e2b0-0f6d-45da-bd46-46a60a9154a7').on('value', (e) => console.log(e));
  const safeUser = processUserEmail(user);
  const promise = Promise.resolve(safeUser);
  return promise.then(authenticateUser)
  .catch(error => {
    if (error.code === NEWUSER) {
      return getInbox(safeUser)
            .then(createUser.bind(this, safeUser))
            .then(authenticateUser.bind(this, safeUser));
    } else {
      console.log('hereeeee');
      throw error;
    }
  });
    // .then(readUserData);
  // return ;
}
