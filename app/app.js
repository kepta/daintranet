import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Actions} from './state/actions';

import {LOGGED_IN, LOGGED_OUT, LOGGING} from './state/actions';

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
  return {login: state.login};
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
  static propTypes = {
    setLogging: React.PropTypes.function.isRequired,
    setLogout: React.PropTypes.function.isRequired
  };
  constructor(props, context) {
    super(props, context);
    console.log(props, context);
  }
  render() {
    console.log(this.props.login);
    if (this.props.login === LOGGED_OUT) {
      return <Login actions={this.props.setLogging}/>;
    }
    if (this.props.login === LOGGED_IN) {
      return (<MainWrapper logout={this.props.setLogout}/>);
    }
    if (this.props.login === LOGGING) {
      return <Loading actions={this.props.setLoggedIn}/>;
    }
    return <div>error</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
