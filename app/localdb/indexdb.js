import { fetchEmail } from '../network/Fetch';
export const DBNAME = 'intranetdb';
export const INBOX = 'inbox';
export const RAND_MIN = 1000;
export const RAND_MAX = 2200;

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
      // alert('You are using an outdated browser. Please upgrade');
      window.location.href = 'http://outdatedbrowser.com/en';
    }
    const openRequest = window.indexedDB.open(DBNAME, 3);
    return new Promise((resolve, reject) => {
      openRequest.onerror = (event) => {
        // console.error(event);
        reject();
      };
      openRequest.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      openRequest.onupgradeneeded = event => {
        this.db = event.target.result;
        this.db.createObjectStore(INBOX, { keyPath: "id" });
        resolve();
      };
    });
  }
  delete(id) {
    const request = this.db.transaction(INBOX, 'readwrite')
                .objectStore(INBOX)
                .delete(id);
    request.onsuccess = (event) => {
        // It's gone!
    };
  }
  set(id, email) {
    const transaction = this.db.transaction(INBOX, 'readwrite');
    transaction.oncomplete = (event) => {
      console.debug("Success");
    };

    transaction.onerror = (event) => {
      console.debug("Error");
    };
    const objectStore = transaction.objectStore(INBOX);
    objectStore.add({ id, email });
  }
  get(id, user) {
    const transaction = this.db.transaction(INBOX);
    const objectStore = transaction.objectStore(INBOX);
    return new Promise((res, rej) => {
      const request = objectStore.get(id);
      request.onsuccess = evt => {
        const value = evt.target.result;
        if (value) {
          return res(value);
        } else {
          return this.getSetEmail(id, user).then((email) => {
            res({ id, email });
          }, (err) => {
            rej(err);
          });
        }
      };
      request.onerror = evt => {
        rej(evt);
      };
    });
  }

  getSetEmail(id, user) {
    return new Promise((res, rej) => {
      fetchEmail(id, user).then((email) => {
        this.set(id, email);
        res(email);
      }, (err) => {
        setTimeout(() => {
          fetchEmail(id, user).then((email) => {
            console.debug('2nd try');
            this.set(id, email);
            res(email);
          }, (err2) => {
            console.debug('3rd try');
            fetchEmail(id, user).then((email) => {
              this.set(id, email);
              res(email);
            }, (err3) => {
              console.error('failed bro', err3);
            });
          });
        }, Math.floor((Math.random() * RAND_MAX) + RAND_MIN));
      });
    });
  }

  getAll(ids, user) {
    const transaction = this.db.transaction(INBOX);
    const objectStore = transaction.objectStore(INBOX);
    return ids.map((id) => new Promise((res, rej) => {
      const request = objectStore.get(id);
      request.onsuccess = evt => {
        const value = evt.target.result;
        if (value) {
          return res(value);
        } else {
          return this.getSetEmail(id, user).then((emails) => {
            res(emails);
          }, (err) => {
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
