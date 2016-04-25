import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../redux/actions';
import { isLoggedIn } from '../network/auth';
import { decideRoute } from '../loginStateHandler';

import LoadingDumb from './LoadingDumb';

import {
  // LOGGED_IN,
  // LOGGED_OUT,
  LOGGING,
  LOGIN_ERROR,
} from '../redux/loginActions';

class Loading extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    history: React.PropTypes.object,
    login: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  state = {
    progress: 0,
  };

  componentDidMount() {
    const user = { id: this.props.login.ID, pass: this.props.login.PASS };
    const loggedIn = isLoggedIn();
    if (this.props.login.STATUS === LOGIN_ERROR) {
      this.context.router.push('/login');
    } else if (this.props.login.ID && this.props.login.PASS) {
      this.props.actions.verifyUser(user);
    } else {
      this.context.router.push(decideRoute(this.props.login.STATUS));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.STATUS !== LOGGING) {
      this.context.router.push(decideRoute(nextProps.login.STATUS));
    }
  }

  render() {
    return (
      <LoadingDumb />
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

function mapStateToProps(state) {
  return { ...state.reducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
