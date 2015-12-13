import React from 'react';
import Inbox from './Inbox/Inbox';
import Email from './Inbox/Email';
import Intranet from './Intranet/Intranet';
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
  displayEmailOrIntranet(id, user, hide) {
    if (id === null) {
      return <Intranet style={this.style.rightContent}/>;
    }
    return (
      <Paper zDepth={1} style={this.style.rightContent}>
          <Email id={id} user={user} hide={hide}/>
      </Paper>
    );
  }
  showEmail(id) {
    this.setState({ id });
  }
  render() {
    console.log(this.state.id);
    return (
      <div style={this.style.wrapper}>
        <Paper zDepth={1} style={this.style.inbox}>
            <Inbox inbox={this.props.inbox} showEmail={this.showEmail} />
        </Paper>
        {this.displayEmailOrIntranet(this.state.id, this.props.user, this.showEmail)}
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
        flexGrow: '1',
        maxWidth: '333px',
        height: '96vh',
        margin: '0 20px',
      },
      rightContent: {
        flexGrow: '8',
        margin: '0 20px',
        height: '96vh',
      },
    };
  }
}
