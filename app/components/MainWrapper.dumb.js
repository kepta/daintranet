import React from 'react';
import Inbox from './Inbox/Inbox';
import Email from './Inbox/Email';
import Intranet from './Intranet/Intranet';
import { Paper, LeftNav } from 'material-ui';
import LeftNavMenu from './LeftNav';
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
      return (
        <Paper zDepth={1} style={this.style.rightContent}>
          <Intranet style={this.style.rightContent}/>
        </Paper>
      );
    }
    return (
      <Paper zDepth={1} style={this.style.rightContent}>
          <Email id={id} user={user} hide={hide}/>
      </Paper>
    );
  }

  showEmail(id) {
    this.setState({ id });
    // this.refs.leftNav.toggle();
  }

  render() {
    console.log(this.state.id);
    return (
      <div>
        <LeftNav ref="leftNav" docked={false}>
          <LeftNavMenu/>
        </LeftNav>
        <div style={this.style.wrapper}>
          <Paper zDepth={1} style={this.style.inbox}>
              <Inbox inbox={this.props.inbox} showEmail={this.showEmail} />
          </Paper>
          {this.displayEmailOrIntranet(this.state.id, this.props.user, this.showEmail)}
        </div>
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
