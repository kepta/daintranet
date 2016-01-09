import React from 'react';
import Base from '../Base';
import { AppBar, TextField, Toolbar, IconButton, ToolbarGroup, ListDivider, Paper } from 'material-ui';
import { BackButton, CloseGrey } from '../Icons';
import Tabs from './Tabs';
import SearchBar from './SearchBar';
import MiscBar from './MiscBar';
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
          <Tabs
            search={this.props.search}
            home={this.props.home}
            hot={this.props.hot}
            searching={this.props.searching}
            handleTabChange={this.props.handleTabChange}
          />
          <MiscBar
            setSearch={this.props.setSearch}
            search={this.props.search}
            home={this.props.home}
            hot={this.props.hot}
            goBack={this.props.goBack}
            pathString={this.props.pathString}
            goToStringPath={this.props.goToStringPath}
          />
          <ListDivider/>
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
