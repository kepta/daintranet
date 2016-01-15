import { firebaseRef } from './auth';
const date = new Date();
const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;
// const dateStringYest = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;

// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
//
// import { secret } from '../../secret.js';
// const SHOWUSERS = false;
//
// function getData(date1) {
//   let email = [];
//   let users = 0;
//   let sessions = 0;
//   return new Promise((res, rej) => {
//     firebaseRef.child('users').once('value', snap => {
//       snap.forEach(dat => {
//         const x = dat.val();
//         if (x[date1]) {
//           users++;
//           sessions+= (x[date1] || 0);
//           email.push({ email: x.email, count: x[date1] });
//         }
//       });
//       email = email.sort((a, b) => b.count - a.count);
//       console.log(email);
//       console.log(`${date1} users = ${users},sessions ${sessions}`);
//       res(users, sessions, email);
//     });
//   });
// }
// function getFreq() {
//   const freq = [];
//   return new Promise((res, rej) => {
//     firebaseRef.child('users').once('value', snap => {
//       // const value = snap.val();
//       // console.log(value.length, val ue);
//       snap.forEach(dat => {
//         const value = dat.val();
//         // console.log(Object.keys(value).length, value);
//         freq[Object.keys(value).length-1] = (freq[Object.keys(value).length-1] + 1 || 0);
//       });
//       // email = email.sort((a, b) => b.count - a.count);
//       // console.log(email);
//       // console.log(`${date1} users = ${users},sessions ${sessions}`);
//       // res(users, sessions, email);
//       console.log(freq);
//     });
//   });
// }
//
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
//   // getData('7-1-2016');
//   // getData('8-1-2016');
//   // getData('9-1-2016');
//   // getData('10-1-2016');
//   // getData('11-1-2016');
//   // getData('12-1-2016');
//   // getData('13-1-2016');
//   // getData('14-1-2016');
//   // getData('15-1-2016');
//     // getFreq();
// }

function toHash(str) {
  let hash = 0;
  let i;
  let chr;
  let len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


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

export function emailIncrement(subject) {
  // const auth = firebaseRef.getAuth();
  if (!subject) {
    return;
  }
  firebaseRef.child('email').child(toHash(subject))
    .transaction((currentData) => {
      if (!currentData) {
        return {
          subject,
          count: 1,
        };
      }
      return {
        subject,
        count: currentData.count + 1,
      };
    }, (e) => {
      if (e) {
        console.error('hero', e);
      }
    });
}
