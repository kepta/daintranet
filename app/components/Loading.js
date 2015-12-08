import React from 'react';
import Base from './Base';
import LoadingDumb from './Loading.dumb';
import db from '../localdb/indexdb';
import { getInbox } from '../network/Fetch';
const LASTEMAILS = 50;

export default class Loading extends Base {
  constructor (props) {
    super(props);
    console.log(props);
    this.state = {
      completed: 0,
    };
  }
  componentDidMount() {
    console.log(this.props.user);
    this.props.dbPromise.then(() => {
      getInbox(this.props.user).then((res, rej) => {
        const ids = this.extractId(res, res.length - LASTEMAILS, res.length);
        Promise.all(db.getAll(ids, this.props.user)).then(mails => {
          console.log(mails);
          this.props.setInbox(res, mails);
          this.props.actionLoggedIn();
        }, errPromise => {
          console.log(errPromise);
        });
      }, err => {
        if (err.response === 401) {
          this.props.setLoginError();
        } else {
          console.log(err);
        }
      });
    });
  }
  extractId(emailList, start, end) {
    let iterator = start > 0 ? start : 0;
    const array = [];
    for (iterator = start > 0 ? start : 0; iterator < end; iterator++) {
      array.push(emailList[iterator].id);
    }
    return array;
  }

  render () {
    return (<LoadingDumb complete={this.state.complete}/>);
  }
}
