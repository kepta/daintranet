import React from 'react';
import { getIP } from '../network/Fetch';
import MainWrapperDumb from './MainWrapper.dumb';

export default class MainWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
    try {
      // console.log(props.login.ID);
      if (props.user.id.indexOf('@daiict') === -1) {
        localStorage.setItem('studentId', props.user.id+'@daiict.ac.in');
      } else {
        localStorage.setItem('studentId', props.user.id);
      }
    } catch (e) {
      if (e) {
        console.error(e);
      }
    }
    // gets the users ip, to detect if he is inside college or not
    getIP();
  }
  render() {
    return (
      <div>
        <MainWrapperDumb
          user={this.props.user}
          actionLoggedIn={this.props.setLoggedIn}
          setLoginError={this.props.setLoginError}
          setLogout={this.props.setLogout}
          dbPromise={this.props.dbPromise}
        />
      </div>
    );
  }
}
