import React from 'react';
import db from '../localdb/indexdb';
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
          inbox={this.props.inbox}
          user={this.props.user}
          />
      </div>
    );
  }
}
