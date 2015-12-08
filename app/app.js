import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Actions } from './state/actions';

import { LOGGED_IN, LOGGED_OUT, LOGGING, LOGIN_ERROR } from './state/actions';

import Login from './components/login';
import Loading from './components/loading';
import MainWrapper from './components/MainWrapper';
/**
 * Maps state to props
 * @param {obj} state The global state
 * @return {login} mapped to state
 */
function mapStateToProps(state) {
  console.log(state);
  return { login: state.login };
}

/**
 * Maps state to props
 * @param {obj} dispatch The global state
 * @return {obj} bindActionCreators mapped to state
 */
function mapDispatchToProps(dispatch) {
  console.log(Actions);
  return bindActionCreators(Actions, dispatch);
}

class App extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      user: null,
    };
    this.setLogin = this.setLogin.bind(this);
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
  render () {
    console.log(this.props.login);
    switch (this.props.login) {
      case LOGGED_OUT:
      case LOGIN_ERROR:
        return (<Login actions={this.props.setLogging}
                       setLogin={this.setLogin}
                       loginState={this.props.login}/>);
      case LOGGED_IN:
        return (<MainWrapper logout={this.props.setLogout}
                             dbPromise={this.props.dbPromise}/>);
      case LOGGING:
        return (
          <Loading user={this.state.user}
                        actionLoggedIn={this.props.setLoggedIn}
                        actionLoginError={this.props.setLoginError}
                        dbPromise={this.props.dbPromise}
          />
        );
      default:
        return <div>error of severe kind</div>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
