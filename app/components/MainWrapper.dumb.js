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
      fresh: true,
    };
    this.showEmail = this.showEmail.bind(this);
  }
  displayEmailOrIntranet(id, user, hide) {
    if (id === null) {
      return (
        <Paper zDepth={1} style={this.style.rightContent}>
          <Intranet style={this.style.rightContent} user={user} fresh={this.state.fresh}/>
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
    this.setState({ id, fresh: false });
    // this.refs.leftNav.toggle();
  }

  render() {
    console.log(this.props.user);
    console.log(window.innerWidth);
    const isMobile =  window.innerWidth < 600 ;
    console.log(isMobile);
    const showInbox = isMobile ? null :
                          (<Paper zDepth={1} style={this.style.inbox}>
                              <Inbox showEmail={this.showEmail}
                                actionLoggedIn={this.props.setLoggedIn}
                                setLoginError={this.props.setLoginError}
                                dbPromise={this.props.dbPromise}
                                user={this.props.user}
                                />
                            </Paper>);
    return (
      <div>
        <LeftNav ref="leftNav" docked={false}>
          <LeftNavMenu/>
        </LeftNav>
        <div style={this.style.wrapper}>
          {showInbox}
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
        width: '333px',
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
