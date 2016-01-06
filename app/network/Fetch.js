import Request from 'superagent';
import { MailParser } from 'mailparser';
import { isLoggedIn } from './auth';
// const local = window.location.href.indexOf('localhost');

const WRONGPASS = 'INVALID_PASSWORD';
const NEWUSER = 'INVALID_USER';

const PRODUCTON_URL = 'https://bangle.io/api';
const DEV_URL = 'http://localhost:3000/api';
const isLocal = window.location.href.indexOf('localhost') > -1;

export const BASEURL = isLocal? DEV_URL : PRODUCTON_URL;

let userFromCollege = false;
const TIMER = 20000;
const TIMER_INBOX = 20000;
let intranet = {};
let timeStamp = null;

export function getIP() {
  return new Promise((resolve, reject) => {
    Request.get('https://api.ipify.org?format=json')
      .end((err, resp) => {
        if (err) {
          reject(err);
        } else {
          try {
            const IP = JSON.parse(resp.text).ip;
            if (IP === '14.139.122.114') {
              console.debug('You are using this app inside the college, hurray bandwidth saving : )');
              userFromCollege = true;
            }
          } catch (e) {
            console.error(e);
          }
          // resolve(JSON.parse(resp.text));
        }
      });
  });
}
// getIP();

export function fetchEmail(id, user) {
  return new Promise((resolve, reject) => {
    Request.get(
      `${BASEURL}/email/${id}`)
          .auth(user.id, user.pass)
          .timeout(TIMER)
          .end((err, resp) => {
            if (err) {
              reject(err);
            } else {
              const mailparser = new MailParser();
              mailparser.write(resp.text);
              mailparser.end();
              mailparser.on('end', (mailObject) => {
                return resolve((mailObject));
              });
            }
          });
  });
}

export function getInbox (user) {
  console.log(user, 'hi');
  return new Promise((resolve, reject) => {
    Request.get(`${BASEURL}/email`)
    .timeout(TIMER_INBOX)
    .auth(user.id, user.pass).end((err, resp) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(resp.text).m);
    });
  });
}

export function fetchIntranet(user, fresh) {
  return new Promise((resolve, reject) => {
    if (fresh) {
      return Request.get(`${BASEURL}/intranet`)
        .timeout(TIMER_INBOX)
        .auth(user.id, user.pass).end((err, resp) => {
          if (err) {
            return reject({ response: 401, err });
          }
          intranet = JSON.parse(resp.text);
          timeStamp = intranet.timeStamp;
          delete intranet.timeStamp;
          return resolve({ intranet, timeStamp });
        });
    }
    return resolve({ intranet, timeStamp });
  });
}
export function formQuery(path) {
  if (userFromCollege) {
    return `http://10.100.56.13/~daiict_nt01/${path}`
  }
  return `${BASEURL}/intranet/${isLoggedIn().password.email}?loc=${path}`;
}

export function fuzzySearch(search) {
  return new Promise((resolve, reject) => {
    return Request.get(`${BASEURL}/find/${search}`)
        .end((err, resp) => {
          if (err) {
            return reject({ response: 401, err });
          }
          return resolve(JSON.parse(resp.text));
        });
  });
}
