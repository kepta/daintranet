import Request from 'superagent';
import { MailParser } from 'mailparser';
const local = window.location.href.indexOf('localhost');

// export const BASEURL = 'http://localhost:1337/webmail.daiict.ac.in';
export const BASEURL = local === -1 ? 'http://128.199.173.123:3000/api'
                                      : 'http://localhost:3000/api';

const TIMER = 7000;
const TIMER_INBOX = 3000;

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
  console.log(user);
  return new Promise((resolve, reject) => {
    Request.get(`${BASEURL}/email`)
    .timeout(TIMER_INBOX)
    .auth(user.id, user.pass).end((err, resp) => {
      if (err) {
        return reject({ response: 401, err });
      }
      localStorage.setItem('inbox', resp.text);
      localStorage.setItem('staleInbox', 0);
      return resolve(JSON.parse(resp.text).m);
    });
  });
}
