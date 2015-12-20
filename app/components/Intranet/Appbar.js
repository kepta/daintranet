import React from 'react';
// import ProfDumb from './Professors.dumb';
import Base from '../Base';
import { AppBar, TextField, Toolbar, ToolbarSeparator, IconButton, ToolbarGroup } from 'material-ui';
import { BackButton, CloseGrey } from '../Icons';
export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.state = {
        search: false,
      };
      this._bind('handleSearchChange', 'clearSearch');
      this.lastQuery = undefined;
    }
    handleSearchChange() {
      const value = this.refs.search.getValue();
      if (value.length >= 4) {
        clearTimeout(this.lastQuery);
        this.lastQuery = setTimeout(() => this.props.setSearch(value), 300);
        this.setState({
          search: true,
        });
      }
    }
    clearSearch() {
      clearTimeout(this.lastQuery);
      this.lastQuery = null;
      this.props.setSearch(null);
      this.refs.search.setValue('');
      this.setState({
        search: false,
      });
    }
    // shouldComponentUpdate() {
    //   // return false;
    // }
    render() {
      const style = this.style();
      return (
        <div>
          <AppBar
            title={<span>DAINTRANET &nbsp; 😁</span>}
          />
        <Toolbar>
            <ToolbarGroup key={0} style={style.backButton} >
              <IconButton onClick={this.lastQuery ? this.clearSearch : this.props.goBack}
                tooltip="Go back"
              >
                {this.lastQuery ? <CloseGrey/> : <BackButton/>}
              </IconButton>
            </ToolbarGroup>
            <ToolbarGroup key={1}>
              <TextField
                ref="search"
                fullWidth={true}
                hintText="Search Intranet"
                errorText={this.state.errorText}
                onChange={this.handleSearchChange}
              />
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
