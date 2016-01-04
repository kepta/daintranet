import React from 'react';
import Base from './Base';
import LoadingDumb from './Loading.dumb';
// import db from '../localdb/indexdb';
// import { getInbox } from '../network/Fetch';
import { login } from '../network/auth';
// import { firebaseRef } from '../index.js';
// const LASTEMAILS = 8;

export default class Loading extends Base {
  constructor (props) {
    super(props);
    this.state = {
      completed: 0,
    };
    // console.log('login');
    login(this.props.user).then((authData) => {
        // dont know what to do with authData
      // console.log('here', authData);
      this.props.setLoggedIn();
    })
    .catch(err => {
      try {
        console.error(err);
        localStorage.setItem('LOGIN_ERROR', err.code); // TODO: err message ?
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
      this.props.setLoginError();
    });
  }
  render () {
    return (<LoadingDumb complete={this.state.complete}/>);
  }
}
