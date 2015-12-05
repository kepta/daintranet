import React from 'react';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.HandleLogin = this.HandleLogin.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
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
    const email = (this.refs.userId.value);
    const pass = (this.refs.password.value);
    const save = this.refs.checker.checked;
    console.log(email, pass, save);
    this.props.actions();
    // this.props.actions();
  }
  HandleChange() {
    // const check = this.refs.checker.getDOMNode().checked;
  }
  render() {
    return (
      <div style={this.styles.main}>
        <div>
          <input style={this.styles.input} ref="userId" type="text" placeholder="id"/>
        </div>
        <div>
          <input style={this.styles.input} ref="password" type="password" placeholder="password"/>
        </div>
        <div style={this.styles.checkbox} className="checker layout-row">
          <div style={{
            paddingRight: '10px'
          }} className="mui-text-caption mui-text-black">Remember me</div>
          <div>
            <input type="checkbox" ref="checker" onChange={this.HandleChange}/>
          </div>
        </div>
        <div className="loginButton hover">
          <a style={this.styles.button} onClick={this.HandleLogin}>Login
          </a>
        </div>
      </div>
    );
  }
  styles () {
    return {
      main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      },
      checkbox: {
        width: '250px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
      },
      input: {
        userSelect: 'text',
        lineHeight: '20px',
        fontSize: '15px',
        minHeight: '20px',
        border: 'none',
        padding: '8px 12px',
        width: '100%',
        outline: 'none'
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
        display: 'inline-block'
      }
    };
  }
}
