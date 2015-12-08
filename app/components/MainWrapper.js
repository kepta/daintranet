import React from 'react';
import db from '../localdb/indexdb';
import DumbMainWrapper from './MainWrapper.dumb';

export default class MainWrapper extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div onClick={this.props.setLogout}> Logoooout!</div>
        <DumbMainWrapper
          emails={this.props.emails}
          inbox={this.props.inbox}
          />
      </div>
    );
  }
}
