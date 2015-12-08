import Request from 'superagent';
export const BASEURL = 'http://localhost:1337/webmail.daiict.ac.in';
const TIMER = 3000;
const TIMER_INBOX = 3000;

export function fetchEmail(id, user) {
  return new Promise((resolve, reject) => {
    Request.get(
      `${BASEURL}/home/~/?id=${id}&fmt=json`)
          .auth(user.id, user.pass)
          .timeout(TIMER)
          .end((err, resp) => {
            if (err) {
              reject(err);
            } else {
              console.log(typeof resp);
              resolve(resp.text);
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
