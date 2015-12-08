import React from 'react';
import Inbox from './Inbox/Inbox';
import Email from './Inbox/Email';
import { Paper } from 'material-ui';
export default class DumbMainWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.style=this.style();
    this.state = {
      id: null,
    };
    this.showEmail = this.showEmail.bind(this);
  }
  displayEmail(id, user) {
    if (id === null) {
      return null;
    }
    return (
      <Paper zDepth={1} style={this.style.email}>
          <Email id={id} user={user}/>
      </Paper>
    );
  }
  showEmail(id) {
    console.log(id);
    this.setState({ id });
  }

  render() {
    console.log(this.state.id);
    return (
      <div style={this.style.wrapper}>
        <Paper zDepth={1} style={this.style.inbox}>
            <Inbox inbox={this.props.inbox} showEmail={this.showEmail} />
        </Paper>
        {this.displayEmail(this.state.id, this.props.user)}
      </div>
    );
  }
  style() {
    return {
      wrapper: {
        display: 'flex',
        flexDirection: 'row',
      },
      inbox: {
        width: '300px',
        height: '96vh',
      },
      email: {
        width: '400px',
      },
    };
  }
}
