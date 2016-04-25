import { firebaseRef } from './auth';

export function saveTodos(todos, uid) {
  return new Promise((resolve, reject) => {
    firebaseRef.child('Users').child(uid).child('todos').set(todos);
    resolve();
  });
}

export function receiveTodos(uid) {
  return new Promise((resolve, reject) => {
    firebaseRef.child('Users').child(uid).child('todos').on('value', (snapshot) => {
      resolve(snapshot.val());
    }, (error) => {
      reject(error.code);
    });
  });
}
