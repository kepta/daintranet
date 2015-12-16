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
            <MenuItem index={1}><a href="/link">Link</a></MenuItem>
          </div>
      );
    }
}
