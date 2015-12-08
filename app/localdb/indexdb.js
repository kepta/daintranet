import { MailParser } from 'mailparser';
import Request from 'superagent';

const DBNAME = 'intranetdb';
const INBOX = 'inbox';
const url = 'http://localhost:1337/webmail.daiict.ac.in';

let db = undefined;
class IndexDB {
  constructor () {
    this.idbSupported = false;
    this.db = undefined;
    this.createDB = this.createDB.bind(this);
    this.set = this.set.bind(this);
    this.getSetEmail = this.getSetEmail.bind(this);
  }
  createDB () {
    if (!window.indexedDB) {
      alert('You are using an outdated browser. Please upgrade');
      window.location.href = 'http://outdatedbrowser.com/en';
    }
    const openRequest = window.indexedDB.open(DBNAME, 3);
    return new Promise((resolve, reject) => {
      openRequest.onerror = (event) => {
        // console.error(event);
        reject();
      };
      openRequest.onsuccess = (event) => {
        db = event.target.result;
        resolve();
      };
      openRequest.onupgradeneeded = event => {
        db = event.target.result;
        const objectStore = db.createObjectStore(INBOX, { keyPath: "id" });
        resolve();
      };
    });
  }
  delete(id) {
    const request = db.transaction(INBOX, 'readwrite')
                .objectStore(INBOX)
                .delete(id);
    request.onsuccess = (event) => {
        // It's gone!
      console.log('deleted', event);
    };
  }
  set(id, email) {
    const transaction = db.transaction(INBOX, 'readwrite');
    transaction.oncomplete = (event) => {
      console.log("Success");
    };

    transaction.onerror = (event) => {
      console.log("Error");
    };
    const objectStore = transaction.objectStore(INBOX);
    objectStore.add({ id, email });
  }
  getSetEmail(id, user) {
    return new Promise((res, rej) => {
      this.getEmailFromWebmail(id, user).then((email) => {
        this.set(id, email);
        res(email);
      }, (err) => {
        // console.log(err);
        rej(err);
      });
    });
  }
  getEmailFromWebmail(id, user) {
    console.log(id, user);
    const { userId, password } = user;
    return new Promise((resolve, reject) => {
      Request.get(
        `${url}/home/~/inbox.json?id=${id}`)
            .auth(userId, password)
            .end(function (err, resp) {
              if (err) {
                // console.log(err);
                reject(err);
              }
              const mailparser = new MailParser();
              mailparser.write(resp.text);
              mailparser.end();
              mailparser.on('end', function(mailObject) {
                // console.log(mailObject);
                return resolve((mailObject));
              });
            });
    });
  }
  get(ids, user) {
    // console.log(db);
    const transaction = db.transaction(INBOX);
    const objectStore = transaction.objectStore(INBOX);
    return ids.map((id) => new Promise((res, rej) => {
      const request = objectStore.get(id);
      request.onsuccess = evt => {
        // console.log('success db');
        const value = evt.target.result;
        if (value) {
          return res(value);
        } else {
          return this.getSetEmail(id, user).then((emails) => {
            res(emails);
          }, (err) => {
            // console.log(err);
            rej(err);
          });
        }
      };
      request.onerror = evt => {
        rej(evt);
      };
    }));
  }
}

const dbInstance = new IndexDB();
export default dbInstance;
