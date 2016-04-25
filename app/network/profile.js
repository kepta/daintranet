import { firebaseRef } from './auth';

export function setName(id, name, uid) {
  return new Promise((resolve, reject) => {
    firebaseRef.child('Users').child(uid).child(id).child('name').set(name);
    resolve(id);
  });
}

export function requestName(id, uid) {
  return new Promise((resolve, reject) => {
    firebaseRef.child('Users').child(uid).child(id).child('name').on('value', (snapshot) => {
      resolve(snapshot.val());
    }, (error) => {
      reject(error.code);
    });
  });
}
