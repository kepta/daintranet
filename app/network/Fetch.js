import Request from 'superagent';
import { MailParser } from 'mailparser';
const local = window.location.href.indexOf('localhost');

// export const BASEURL = 'http://localhost:1337/webmail.daiict.ac.in';
export const BASEURL = local !== -1 ? 'http://128.199.173.123:3000/api'
                                      : 'http://localhost:3000/api';

const TIMER = 7000;
const TIMER_INBOX = 7000;
let intranet = {};
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
                console.log(mailObject);
                return resolve((mailObject));
              });
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
        return reject({ response: 401, err });
      }
      return resolve(JSON.parse(resp.text).m);
    });
  });
}

export function fetchIntranet(user, fresh) {
  return new Promise((resolve, reject) => {
    if (fresh) {
      console.log('here');
      return Request.get(`${BASEURL}/intranet`)
        .timeout(TIMER_INBOX)
        .auth(user.id, user.pass).end((err, resp) => {
          if (err) {
            return reject({ response: 401, err });
          }
          intranet = JSON.parse(resp.text);
          return resolve(intranet);
        });
    }
    return resolve(intranet);
  });
}
