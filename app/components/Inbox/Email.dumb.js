import React from 'react';
import { } from 'material-ui';
import Appbar from './Email.appbar';
import Card from './Email.card';
import { Attachments, Close } from '../Icons';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class DumbEmail extends React.Component {
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
