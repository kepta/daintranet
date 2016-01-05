import React from 'react';
// import ProfDumb from './Professors.dumb';
import { MenuItem } from 'material-ui';

export default class Nav extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
          <div>
            <MenuItem index={0}>Menu Item</MenuItem>
            <MenuItem index={1}><a href="https://docs.google.com/forms/d/1W7VEWJMFNqizlQ1dw4l93xWxyXGVv5CoQtHYUhZ8gn8/viewform?usp=send_form">Feedback</a></MenuItem>
            <MenuItem index={2}><div onTouchTap={this.props.setLogout}> Logout!</div></MenuItem>
        </div>
      );
    }
}
