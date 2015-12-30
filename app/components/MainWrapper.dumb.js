import React from 'react';
import Inbox from './Inbox/Inbox';
import Email from './Inbox/Email';
import Intranet from './Intranet/Intranet';
import isMobileFunc from '../helper/isMobile';
import Base from './Base';
import { Paper, LeftNav } from 'material-ui';
import LeftNavMenu from './LeftNav';

const isMobile = isMobileFunc();

export default class DumbMainWrapper extends Base {
  constructor(props) {
    super(props);
    this.style=this.style();
    this.state = {
      id: null,
      fresh: true,
      leftNav: false,
    };
    // this.showEmail = this.showEmail.bind(this);
    this._bind('showEmail', 'displayEmailOrIntranet', 'toggleNav');
  }
  displayEmailOrIntranet(id, user, hide, leftNav) {
    if (id === null) {
      return (
        <Paper zDepth={1} style={this.style.rightContent}>
          <Intranet style={this.style.rightContent}
            user={user}
            fresh={this.state.fresh}
            isMobile={isMobile}
            leftNav={leftNav}
          />
        </Paper>
      );
    }
    return (
      <Paper zDepth={1} style={this.style.rightContent}>
          <Email id={id} user={user} hide={hide} isMobile={isMobile}/>
      </Paper>
    );
  }

  showEmail(id) {
    this.setState({ id, fresh: false });
    // this.refs.leftNav.toggle();
  }
  toggleNav() {
    this.setState({ leftNav: !this.state.leftNav });
  }
  render() {
    const showInbox = isMobile ? null :
                          (<Paper zDepth={1} style={this.style.inbox}>
                              <Inbox showEmail={this.showEmail}
                                actionLoggedIn={this.props.setLoggedIn}
                                setLoginError={this.props.setLoginError}
                                dbPromise={this.props.dbPromise}
                                user={this.props.user}
                                isMobile={isMobile}
                              />
                            </Paper>);
    return (
      <div>
        <LeftNav docked={false}
          open={this.state.leftNav}
          onRequestChange={leftNav => this.setState({ leftNav })}
        >
          <LeftNavMenu setLogout={this.props.setLogout}/>
        </LeftNav>
        <div style={this.style.wrapper}>
          {showInbox}
          {this.displayEmailOrIntranet(this.state.id, this.props.user, this.showEmail, this.toggleNav)}
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
