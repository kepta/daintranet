import { firebaseRef } from './auth';
const date = new Date();
const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;
// const dateStringYest = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;

// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");

// function getData() {
//   let totalCount = 0;
//   let totalUsers = 0;
//   let email = [];
//   let regEmail = [];
//   let regular = 0;
//   firebaseRef.child('users').once('value', snap => {
//     snap.forEach(dat => {
//       const x = dat.val();
//       // console.log(x.email, x['8-1-2016']);
//       if (x['7-1-2016']) {
//         totalUsers++;
//         totalCount+= (x['8-1-2016'] || 0);
//         email.push(x.email);
//       }
//       if (x['9-1-2016']) {
//         regular++;
//         // totalCount+= (x['8-1-2016'] || 0);
//         regEmail.push(x.email);
//       }
//
//       // if (dat.val()['8-1-2016']) {
//       //   totalUsers++;
//       //   totalCount += dat.val()['8-1-2016'].count;
//       // }
//       // console.log(dat.child('8-1-2016').key('email').val());
//     });
//     console.log(email);
//     console.log(totalUsers, totalCount, regular);
//   });
// }
//
// firebaseRef.auth("", function(error, result) {
//   if (error) {
//     console.log("Authentication Failed!", error);
//   } else {
//     console.log(getData());
//     console.log("Authenticated successfully with payload:", result.auth);
//     console.log("Auth expires at:", new Date(result.expires * 1000));
//   }
// });


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
    }, function (errorObject) {
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
