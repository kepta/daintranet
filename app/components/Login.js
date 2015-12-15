import React from 'react';
import Base from './Base';
import { LOGIN_ERROR } from '../state/actions';
import { FlatButton } from 'material-ui';

const ERROR_MESSAGE = 'Invalid user id';
export default class Login extends Base {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    // this.HandleLogin = this.HandleLogin.bind(this);
    // this.HandleChange = this.HandleChange.bind(this);
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
    alert('hi');
    const id = (this.refs.userId.value);
    const pass = (this.refs.password.value);
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
          <input style={this.styles.input}
            ref="userId" type="text" placeholder="id"/>
        </div>
        <div>
          <input style={this.styles.input}
              ref="password" type="password"
              placeholder="password"/>
        </div>
        </form>
        {/*<div style={this.styles.checkbox} className="checker layout-row">
          <div style={{
            paddingRight: '10px',
          }} className="mui-text-caption mui-text-black">Remember me</div>
          <div>
            <input type="checkbox" ref="checker" onChange={this.HandleChange}/>
          </div>
        </div>*/}
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
