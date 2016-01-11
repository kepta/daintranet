import { firebaseRef } from './auth';
const date = new Date();
const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;
// const dateStringYest = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;

// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
//
// import { secret } from '../../secret.js';
const SHOWUSERS = false;

function getData(date1) {
  let email = [];
  let users = 0;
  let sessions = 0;
  return new Promise((res, rej) => {
    firebaseRef.child('users').once('value', snap => {
      snap.forEach(dat => {
        const x = dat.val();
        if (x[date1]) {
          users++;
          sessions+= (x[date1] || 0);
          email.push({ email: x.email, count: x[date1] });
        }
      });
      email = email.sort((a, b) => b.count - a.count);
      console.log(email);
      console.log(`${date1} users = ${users},sessions ${sessions}`);
      res(users, sessions, email);
    });
  });
}

// if (SHOWUSERS) {
//   firebaseRef.auth(secret, function(error, result) {
//     if (error) {
//       console.log("Authentication Failed!", error);
//     } else {
//       console.log(getData());
//       console.log("Authenticated successfully with payload:", result.auth);
//       console.log("Auth expires at:", new Date(result.expires * 1000));
//     }
//   });
//   getData('7-1-2016');
//   getData('8-1-2016');
//   getData('9-1-2016');
//   getData('10-1-2016');
//   getData('11-1-2016');
// }

export function readTopFolders(user) {
  return new Promise((resolve, reject) => {
    const obj = {};
    firebaseRef
    .child('file').child(dateString).child(user.id.slice(0, 6))
    .orderByValue().limitToLast(10).once('value', snap => {
      snap.forEach(dat => {
        obj[dat.key()] = (obj[dat.key()] || 0) + dat.val();
      });
      if (date.getDate() === 1) {
        resolve(obj);
      }
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject(errorObject);
      return;
    });
    if (date.getDate() >= 2) {
      const yesterday = `${date.getDate() - 1}-${date.getMonth()+1}-${date.getYear()+1900}`;
      firebaseRef
      .child('file').child(yesterday).child(user.id.slice(0, 6))
      .orderByValue().limitToLast(10).once('value', snap => {
        snap.forEach(dat => {
          obj[dat.key()] = (obj[dat.key()] || 0) + dat.val();
        });
        resolve(obj);
      });
    }
  });
}
export function increment(path, user, isFile) {
  // console.log('incrementing');
  console.log(path);
  const target = firebaseRef.child('file').child(dateString).child(user.id.slice(0, 6)).child(path);
  target.transaction((currentData) => {
    return (currentData || 0) + 1;
  }, (e) => {
    if (e) {
      console.error('hero', e);
    }
  });
}

export function loginIncrement() {
  const auth = firebaseRef.getAuth();
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
