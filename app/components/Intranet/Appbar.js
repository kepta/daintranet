import React from 'react';
// import ProfDumb from './Professors.dumb';
import Base from '../Base';
import { AppBar, FlatButton, TextField, Toolbar, ToolbarSeparator, IconButton } from 'material-ui';
import { Close } from '../Icons';
export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.state = {
        input1: [],
      };
      this._bind('handleSearchChange');
    }
    handleSearchChange(who, k) {
      console.log(this.refs.search.getValue());
    }
    render() {
      return (
        <div>
          <AppBar
            title={<span>DAINTRANET &nbsp; 😁</span>}
          />
        <Toolbar>
            <TextField
                ref="search"
                hintText="Search Intranet"
                errorText={this.state.errorText}
                onChange={this.handleSearchChange} />
        </Toolbar>
        </div>
      );
    }
}
