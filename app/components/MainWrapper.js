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
