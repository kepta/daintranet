import { firebaseRef } from './auth';
import Firebase from 'firebase';

function send(v) {
  return new Promise((resolve, reject) => {
    const c = v.c;
    c.time = Firebase.ServerValue.TIMESTAMP;
    const group = v.group;
    const ref = firebaseRef.child(group);
    ref.push(c);
  });
}

export function pushChat(c, group) {
  const promise = Promise.resolve({ c, group });
  return promise.then(send);
}
