import React from 'react';
import Base from './Base';
import { LOGIN_ERROR } from '../state/actions';
import { FlatButton, TextField, Paper } from 'material-ui';
import { flexCenter } from '../helper/flex';
const ERROR_MESSAGE = 'Invalid user id';
export default class Login extends Base {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this._bind('handleLogin', 'handleEnter');
    this.styles = this.styles();
  }
  componentDidMount() {}
  ErrorHandler() {
    return (
      <p>
        Something wrong
      </p>
    );
  }
  handleEnter(e) {
    if (e.which === 13) {
      this.handleLogin();
    }
  }
  handleLogin(event) {
    const id = (this.refs.userId.getValue());
    const pass = (this.refs.password.getValue());
    this.props.setLogging({ id, pass });
  }
  render() {
    console.log(this.props.loginState);
    const error = this.props.loginState === LOGIN_ERROR ?
        <div>{ERROR_MESSAGE}</div> : null;
    console.log(error);
    return (
      <div style={this.styles.main}>
        <Paper style={this.styles.paper} onKeyDown={this.handleEnter}>
          <div style={this.styles.headerContainer}>
            <h1 style={{fontSize: '5em', marginBottom: '20px'}}>🎓</h1>
            <h3 style={this.styles.header}>daintranet.com</h3>
          </div>
          {error}
          <div>
            <TextField
              hintText="ID"
              ref="userId"
              hintStyle={ error ? { color: 'red' } : {} }
            />
          </div>
          <div>
            <TextField
              ref="password" type="password"
              hintText="password"
              hintStyle={ error ? { color: 'red' } : {} }
            />
          </div>
          <div style={flexCenter}>
            <FlatButton
              label="Login"
              style={{ flexGrow: '1' }}
              onTouchTap={this.handleLogin}
            />
          </div>
        </Paper>
      </div>
    );
  }
  styles() {
    return {
      main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      },
      headerContainer: {
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '20px',
      },
      header: {
        textTransform: 'uppercase',
        fontSize: '28px',
        fontWeight: '300',
        lineHeight: '1.2',
        color: '#757575',
        fontFamily: 'roboto',
      },
      checkbox: {
        width: '250px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
      },
      paper: {
        padding: '12px',
      },
      input: {
        userSelect: 'text',
        lineHeight: '20px',
        fontSize: '15px',
        minHeight: '20px',
        border: 'none',
        padding: '8px 12px',
        width: '100%',
        outline: 'none',
      },
      button: {
        backgroundColor: '#f47e7e',
        borderRadius: '5px',
        padding: '5px 20px',
        fontSize: '22px',
        textDecoration: 'none',
        margin: '20px',
        color: '#fff',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
      },
    };
  }
}
