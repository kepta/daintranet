import Request from 'superagent';
import { MailParser } from 'mailparser';
const local = window.location.href.indexOf('localhost');

// export const BASEURL = 'http://localhost:1337/webmail.daiict.ac.in';
export const BASEURL = local !== -1 ? 'http://128.199.173.123:1337/webmail.daiict.ac.in'
                                      : 'http://localhost:1337/webmail.daiict.ac.in';

const TIMER = 7000;
const TIMER_INBOX = 3000;

export function fetchEmail(id, user) {
  return new Promise((resolve, reject) => {
    Request.get(
      `${BASEURL}/home/~/?id=${id}`)
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
  console.log(user);
  return new Promise((resolve, reject) => {
    Request.get(`${BASEURL}/home/~/inbox.json`)
    .timeout(TIMER_INBOX)
    .auth(user.id, user.pass).end((err, resp) => {
      if (err) {
        // if (resp.statusCode === 401) {
        return reject({ response: 401, err });
        // }
        // } else {
        //   const stale = parseInt(localStorage.getItem('staleInbox'));
        //   if (stale === 0 || stale === 1) {
        //     localStorage.setItem('staleInbox', 1);
        //     return resolve(JSON.parse(localStorage.getItem('inbox')).m);
        //   } else {
        //     this.props.actionLoginError();
        //     return reject(err);
        //   }
        // }
      }
      localStorage.setItem('inbox', resp.text);
      localStorage.setItem('staleInbox', 0);
      return resolve(JSON.parse(resp.text).m);
    });
  });
}
