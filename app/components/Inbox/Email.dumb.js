import React from 'react';
import Base from '../Base';

import Appbar from './Email.appbar';
import Card from './Email.card';

export default class DumbEmail extends Base {
  constructor(props) {
    super(props);
  }
  render() {
    const email = this.props.email.email;
    console.log(email);
    const style = this.style();
    return (
      <div style={style.main}>
        <Appbar email={email} hide={this.props.hide}/>
        <Card email={email}/>
      </div>
    );
  }
  style() {
    return {
      main: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    };
  }
}
