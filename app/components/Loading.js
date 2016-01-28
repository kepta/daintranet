import React from 'react';
import Base from './Base';
import LoadingDumb from './Loading.dumb';
import { login, isLoggedIn } from '../network/auth';

export default class Loading extends Base {
  componentDidMount() {
    // console.log(isLoggedIn());
    if (isLoggedIn() === false) {
      login(this.props.user).then((authData) => {
        console.log('setloggedin');
        this.props.setLoggedIn();
      }).catch(err => {
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
    } else {
      this.props.setLoggedIn();
    }
  }
  render() {
    return (<LoadingDumb/>);
  }
}
