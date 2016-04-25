import Request from 'superagent';

const TIMER_INBOX = 20000;
const BASEURL = 'https://bangle.io/api';

export function fetchInbox(user) {
  const whereIsAt = user.ID.indexOf('@');
  if (whereIsAt > -1) {
    user.ID = user.ID.slice(0, whereIsAt);
  }
  return new Promise((resolve, reject) => {
    Request.get(`${BASEURL}/email`)
    .timeout(TIMER_INBOX)
    .auth(user.ID, user.PASS).end((err, resp) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(resp.text).m);
    });
  });
}


export function fetchEmail(user, id) {
  let actualId = id.indexOf('.') > -1 ? id.indexOf('.'): id.length;
  actualId = id.slice(0, actualId);
  return new Promise((resolve, reject) => {
    Request.get(
      `${BASEURL}/email/${actualId}`)
          .auth(user.ID, user.PASS)
          .timeout(TIMER_INBOX)
          .end((err, resp) => {
            if (err) {
              return reject(err);
            } else {
              const email = JSON.parse(resp.text);
              const date = new Date(email.date);
              email.date = date;
              return resolve(email);
            }
          });
  });
}
