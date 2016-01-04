import React from 'react';
import Base from './Base';
import LoadingDumb from './Loading.dumb';
// import db from '../localdb/indexdb';
// import {getInbox} from '../network/Fetch';
import { login } from '../network/auth';
// const LASTEMAILS = 8;

export default class Loading extends Base {
  constructor (props) {
    super(props);
    login(props.user).then((authData) => {
      props.setLoggedIn();
    }).catch(err => {
      try {
        console.error(err);
        localStorage.setItem('LOGIN_ERROR', err.code); // TODO: err message ?
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
      props.setLoginError();
    });
  }
  render () {
    return (<LoadingDumb/>);
  }
}
