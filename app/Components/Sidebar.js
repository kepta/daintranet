import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../helper/Icons.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Sidebar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
  }

  constructor(props, state) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  setLogout = () => {
    this.props.actions.setLogout();
  }

  style = () => {
    return {
      nav: this.props.sidebarOpen ?
      'navbar navbar-inverse navbar-fixed-top sidebar-wrapper sidebar-open' :
      'navbar navbar-inverse navbar-fixed-top sidebar-wrapper sidebar-closed',
    };
  }

  render() {
    const style = this.style();
    return (
      <nav
        className={style.nav}
        role="navigation"
      >
          <ul className="nav sidebar-nav">
              <li className="sidebar-brand">
                  <a href="#">
                     Welcome!
                  </a>
              </li>

              <li>
                  <a href="https://docs.google.com/forms/d/1rZoD-Bl2ze61j06_2IZMke_4iA4-iQTZ0XFBdudbl4s/viewform?usp=send_form" target="_blank" onClick={this.props.toggleSideBar} >
                    <Icon size="1.9em" icon="bug-report" style={{ marginRight: '15px' }} />Report a Bug
                  </a>
              </li>
              <li>
                  <Link to={'/login'} onClick={this.setLogout} >
                    <Icon size="1.9em" icon="redo" style={{ marginRight: '15px' }} />Logout
                  </Link>
              </li>
          </ul>
      </nav>
    );
  }
}

export default Sidebar;
