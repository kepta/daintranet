import { secret } from '../../secret.js';


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
function getFreq() {
  const freq = [];
  const freqMost = [];
  let count = 0;
  return new Promise((res, rej) => {
    firebaseRef.child('users').once('value', snap => {
      // const value = snap.val();
      // console.log(value.length, val ue);
      snap.forEach(dat => {
        const value = dat.val();
        // console.log(Object.keys(value).length, value);
        freq[Object.keys(value).length-1] = (freq[Object.keys(value).length-1] + 1 || 0);
        if (Object.keys(value).length-1 === 1) {
          freqMost.push({ email: value.email });

          if (value.email.indexOf('201301189') > -1) {
            console.log(Object.keys(value));
            count++;
            console.log(`https://ecampus.daiict.ac.in/webapp/intranet/StudentPhotos/${value.email.slice(0, 9)}.jpg`);
            }
          }
      });
      // email = email.sort((a, b) => b.count - a.count);
      // console.log(email);
      // console.log(`${date1} users = ${users},sessions ${sessions}`);
      // res(users, sessions, email);
      console.log(count, freq);
    });
  });
}

if (SHOWUSERS) {
  firebaseRef.auth(secret, function(error, result) {
    if (error) {
      console.log("Authentication Failed!", error);
    } else {
      console.log(getData());
      console.log("Authenticated successfully with payload:", result.auth);
      console.log("Auth expires at:", new Date(result.expires * 1000));
    }
  });
  // getData('7-1-2016');
  // getData('8-1-2016');
  // getData('9-1-2016');
  // getData('10-1-2016');
  // getData('11-1-2016');
  // getData('12-1-2016');
  // getData('13-1-2016');
  // getData('14-1-2016');
  // getData('15-1-2016');
  // getData('16-1-2016');
  // getData('17-1-2016');
  // getData('18-1-2016');
  // getData('19-1-2016');
  // getData('20-1-2016');
  // getData('21-1-2016');
  getData('22-1-2016');
  getData('23-1-2016');
  getData('24-1-2016');
  getData('25-1-2016');
  getData('26-1-2016');
  getData('27-1-2016');
  getData('28-1-2016');
  getFreq();
}
