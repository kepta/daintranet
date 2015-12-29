import React from 'react';
import MainWrapperDumb from './MainWrapper.dumb';

export default class MainWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div onClick={this.props.setLogout}> Logoooout!</div>
        <MainWrapperDumb
          user={this.props.user}
          actionLoggedIn={this.props.setLoggedIn}
          setLoginError={this.props.setLoginError}
          dbPromise={this.props.dbPromise}
        />
      </div>
    );
  }
}
