import { firebaseRef } from './auth';

const date = new Date();
console.log(date);
const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getYear()+1900}`;
console.log(dateString);
export function increment(path, user, isFile) {
  const target = firebaseRef.child('file').child(dateString).child(path);
  firebaseRef.child('file').child(dateString).orderByValue().once('value', snap => {
    // console.log('e', snap.val());
    snap.forEach(data => {
      console.log(data.key(), data.val());
    });
  });
  target.transaction((currentData) => {
    if (currentData === null) {
      return 1;
    } else {
      return currentData+1;
    }
  });
}

export function readTopFolders() {
  
}
