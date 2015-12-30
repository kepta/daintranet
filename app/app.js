import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Actions } from './state/actions';
import { LOGGED_IN, LOGGED_OUT, LOGGING, LOGIN_ERROR } from './state/actions';

import Login from './components/login';
// import Loading from './components/loading';
import MainWrapper from './components/MainWrapper';

function mapStateToProps(state) {
  console.log(state);
  return { login: state.login };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      inbox: null,
      mails: null,
    };
    this.setLogin = this.setLogin.bind(this);
    this.setInbox = this.setInbox.bind(this);
  }
  setLogin (userId, password) {
    this.setState({
      user: {
        userId,
        password,
      },
    });
    this.props.setLogging();
  }
  setInbox (inbox, mails) {
    this.setState({
      inbox, mails,
    });
  }
  render () {
    console.log(this.props.login);
    const user = { id: this.props.login.ID, pass: this.props.login.PASS };
    console.log(user);
    const props = {
      setLogging: this.props.setLogging,
      loginState: this.props.login.STATUS,
      setLogout: this.props.setLogout,
      user,
      dbPromise: this.props.dbPromise,
    };
    switch (this.props.login.STATUS) {
      case LOGGED_OUT:
      case LOGIN_ERROR:
        return (<Login {...props}/>);
      case LOGGED_IN:
      case LOGGING:
        return (
          <MainWrapper {...props}
            actionLoggedIn={this.props.setLoggedIn}
            setLoginError={this.props.setLoginError}
          />
      );
      // case LOGGING:
      //   return (
      //     <Loading {...props}
      //               actionLoggedIn={this.props.setLoggedIn}
      //               setLoginError={this.props.setLoginError}
      //               setInbox={this.setInbox}
      //     />
      //   );
      default:
        return <div>error of severe kind</div>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
