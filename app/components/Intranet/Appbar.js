import React from 'react';
import Base from '../Base';
import { AppBar, TextField, Toolbar, IconButton, ToolbarGroup, ListDivider, Paper } from 'material-ui';
import { BackButton, CloseGrey } from '../Icons';
import SearchBar from './SearchBar';

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
    handleToggle() {
      // console.log('touch tap');
    }
    render() {
      const style = this.style();
      return (
        <div>
          <AppBar
            title={<span>DAINTRANET &nbsp; 👹</span>}
            onLeftIconButtonTouchTap={this.props.leftNav}
          />
          <SearchBar
            search={this.props.search}
            home={this.props.home}
            hot={this.props.hot}
            handleClick={this.props.handleClick}
          />
            <Toolbar >
              <ToolbarGroup key={0} style={style.backButton} >
                <IconButton onTouchTap={this.lastQuery ? this.clearSearch : this.props.goBack}>
                  {this.lastQuery ? <CloseGrey/> : <BackButton/>}
                </IconButton>
              </ToolbarGroup>
              <ToolbarGroup key={1}>
                <TextField
                  ref="search"
                  fullWidth
                  hintText="Search Intranet"
                  errorText={this.state.errorText}
                  onChange={this.handleSearchChange}
                />
              </ToolbarGroup>
              </Toolbar>
          <ListDivider/>
        </div>
      );
    }
    style() {
      return {
        backButton: {
          position: 'relative',
          left: '-20px',
        }
      };
  }
}
