import Request from 'superagent';
import Immutable from 'immutable';

const PRODUCTON_URL = 'https://bangle.io/api';

export const BASEURL = PRODUCTON_URL;
let userFromCollege = false;
const TIMER = 20000;
const TIMER_INBOX = 20000;
let intranet = null;
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
              // console.debug('You are using this app inside the college, hurray bandwidth saving : )');
              userFromCollege = true;
            }
          } catch (e) {
            // console.error(e);
          }
        }
      });
  });
}
// getIP();

export function fetchEmail(id, user) {
  let actualId = id.indexOf('.') > -1 ? id.indexOf('.'): id.length;
  actualId = id.slice(0, actualId);
  return new Promise((resolve, reject) => {
    Request.get(
      `http://localhost:3000/api/email/${actualId}`)
          .auth(user.id, user.pass)
          .timeout(TIMER)
          .end((err, resp) => {
            if (err) {
              reject(err);
              return null;
            } else {
              const email = JSON.parse(resp.text);
              const date = new Date(email.date);
              email.id = `${email.id}.${date}`;
              return resolve(email);
            }
          });
  });
}

export function getInbox (user) {
  return new Promise((resolve, reject) => {
    Request.get(`${BASEURL}/email`)
    .timeout(TIMER_INBOX)
    .auth(user.id, user.pass).end((err, resp) => {
      if (err) {
        return reject(err);
      }
      // console.log(resp.text);
      // const email = JSON.parse(resp.text).m;
      // console.log(email);
      return resolve(JSON.parse(resp.text).m);
    });
  });
}

export function fetchIntranet(user) {
  return new Promise((resolve, reject) => {
    return Request.get(`${BASEURL}/intranet`)
      .timeout(TIMER_INBOX)
      .end((err, resp) => {
        if (err) {
          return reject({ response: 401, err });
        }
        intranet = JSON.parse(resp.text);
        timeStamp = intranet.timeStamp;
        delete intranet.timeStamp;
        delete intranet['log.txt'];
        delete intranet['tree.json'];
        delete intranet.time;
        delete intranet.kh_test;
        delete intranet['fuzzy.json'];
        return resolve({ intranet, timeStamp });
      });
  });
}

export function formQuery(path) {
  const localPath = path.split('/').map((o) => encodeURIComponent(o)).join('/');
  if (userFromCollege) {
    return `http://10.100.56.13/~daiict_nt01/${localPath}`;
  }
  // return `${BASEURL}/intranet/${isLoggedIn().password.email}?loc=${localPath}`;
  return `${BASEURL}/intranet/SENTESTING?loc=${localPath}`;
}

export function fuzzySearch(search) {
  return new Promise((resolve, reject) => {
    return Request.get(`${BASEURL}/find/${search}`)
        .end((err, resp) => {
          if (err) {
            return reject({ response: 401, err });
          }
          const result = JSON.parse(resp.text);
          if (Array.isArray(result)) {
            return resolve(Immutable.fromJS(result.map(d => {
              const path = d.path.split('/').slice(3);
              return {
                name: d.name,
                path,
                isFile: path[path.length - 1].slice(-4).indexOf('.') > -1,
              };
            })));
          }
          return reject({ respone: 401, err: 'not an array' });
        });
  });
}
