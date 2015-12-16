import React from 'react';
import Base from './Base';
import { LOGIN_ERROR } from '../state/actions';
import { FlatButton, TextField, Paper } from 'material-ui';

const ERROR_MESSAGE = 'Invalid user id';
export default class Login extends Base {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this._bind('HandleLogin', 'HandleChange');
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
  HandleLogin() {
    const id = (this.refs.userId.getValue());
    const pass = (this.refs.password.getValue());
    this.props.setLogging({ id, pass });
  }
  HandleChange() {
    // const check = this.refs.checker.getDOMNode().checked;
  }
  render() {
    console.log(this.props.loginState);
    const error = this.props.loginState === LOGIN_ERROR ?
        <div>{ERROR_MESSAGE}</div> : null;
    console.log(error);
    return (
      <div style={this.styles.main}>
        {error}
        <form>
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
        </form>
        <FlatButton label="Login" onClick={this.HandleLogin}/>
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
      checkbox: {
        width: '250px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
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
