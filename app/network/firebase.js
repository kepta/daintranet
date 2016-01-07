import { firebaseRef } from './auth';
const date = new Date();
const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;

export function readTopFolders() {
  // firebaseRef.child('file').child(dateString).orderByValue().on('value', snap => {
  //   snap.forEach(data => {
  //     console.log(data.key(), data.val());
  //   });
  // });
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
