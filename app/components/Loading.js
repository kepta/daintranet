import React from 'react';
import Request from 'superagent';
import Base from './Base';
import LoadingDumb from './Loading.dumb';
const url = 'http://localhost:1337/webmail.daiict.ac.in';
import db from '../localdb/indexdb';
export default class Loading extends Base {
  constructor (props) {
    super(props);
    console.log(props);
    this._bind('getInbox', 'getEmails');
    this.state = {
      completed: 0,
    };
  }
  componentDidMount() {
    this.props.dbPromise.then(() => {
      // db.delete("16203");
      // return;
      this.getInbox().then((res, rej) => {
        console.log(res.m);
        localStorage.setItem('inbox', res);
        const ids = this.extractId(res.m, res.m.length - 10, res.m.length);
        // console.log(db.get(ids, this.props.user));
        Promise.all(db.get(ids, this.props.user)).then(response => {
          console.log(response);
        }, err => {
          console.log(err);
        });
        this.props.actionLoggedIn();
      });
    });
  }
  /**
   * @param emailList the entire email
   * @param start the starting of pagination
   * @param end end
   * @return the filtered array
   */
  extractId(emailList, start, end) {
    let iterator = start > 0 ? start : 0;
    const array = [];
    for (iterator = start > 0 ? start : 0; iterator < end; iterator++) {
      array.push(emailList[iterator].id);
    }
    return array;
  }
  /**
   * @param {n} number of emails to fetch
   * @return the emails
   */
  getEmails(n) {

  }
  getInbox () {
    const { userId, password } = this.props.user;
    return new Promise((resolve, reject) => {
      Request.get(`${url}/home/~/inbox.json`).auth(userId, password).end((err, resp) => {
        if (err) {
          console.log(err);
          this.props.actionLoginError();
          reject(err);
        }
        localStorage.setItem('inbox', resp.text);
        resolve(JSON.parse(resp.text));
      });
    });
  }
  render () {
    return (<LoadingDumb complete={this.state.complete}/>);
  }
}
