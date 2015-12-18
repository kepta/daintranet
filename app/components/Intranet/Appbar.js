import React from 'react';
// import ProfDumb from './Professors.dumb';
import Base from '../Base';
import { AppBar, TextField, Toolbar, ToolbarSeparator, IconButton, ToolbarGroup } from 'material-ui';
import { BackButton } from '../Icons';
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
      const style = this.style();
      return (
        <div>
          <AppBar
            title={<span>DAINTRANET &nbsp; 😁</span>}
          />
        <Toolbar>
          <div onClick={this.props.goBack}>
            <ToolbarGroup key={0} style={style.backButton} >
              <IconButton ><BackButton/></IconButton>
            </ToolbarGroup>
            </div>
            <ToolbarGroup key={1}>
              <TextField
                ref="search"
                hintText="Search Intranet"
                errorText={this.state.errorText}
                onChange={this.handleSearchChange} />
            </ToolbarGroup>
        </Toolbar>
        </div>
      );
    }
    style() {
      return {
        backButton: {
          position: 'relative',
          left: '-20px',
        },
      };
    }
}
