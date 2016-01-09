import React from 'react';
import Base from '../Base';
import { HomeIcon, SearchIcon, HotIcon } from '../Icons';
import { primaryTextWhite, greyShade, baseColor } from '../../helper/colorPallete.js';
import { AppBar, TextField, Toolbar, IconButton, ToolbarGroup, ListDivider, Paper } from 'material-ui';
import { BackButton, CloseGrey } from '../Icons';

export default class Tab extends Base {
  giveStyle(style, tab) {
    return {
      ...style,
      borderBottom: tab ? '3px solid '+ baseColor : '0px',
    };
  }
  handleClick(type) {
    this.props.handleTabChange({
      search: type === 'search',
      hot: type === 'hot',
      home: type === 'home',
      searching: false,
    });
  }
  feedBack() {
    alert('This feature is in progress. If you have any bugs, feature request, suggestion. Please fill the form.');
    window.open('https://docs.google.com/forms/d/1W7VEWJMFNqizlQ1dw4l93xWxyXGVv5CoQtHYUhZ8gn8/viewform?usp=send_form', '_blank');
  }
  render() {
    const style = this.style();
    return (
      <div style={style.main}>
        <div style={this.giveStyle(style.tab, this.props.search)} onTouchTap={this.handleClick.bind(this, 'search')}>
          <IconButton tooltip="Search">
            <SearchIcon/>
          </IconButton>
        </div>
        <div style={this.giveStyle(style.tab, this.props.hot)} onTouchTap={this.handleClick.bind(this, 'hot')}>
          <IconButton tooltip="Hot">
            <HotIcon/>
          </IconButton>
        </div>
        <div style={this.giveStyle(style.tab, this.props.home)} onTouchTap={this.handleClick.bind(this, 'home')}>
          <IconButton tooltip="Intranet">
            <HomeIcon/>
          </IconButton>
        </div>
      </div>
    );
  }
  style() {
    return {
      main: {
        display: 'flex',
        height: '50px',
        cursor: 'pointer',
        flexDirection: 'row',
      },
      tab: {
        display: 'flex',
        width: '100px',
        alignItems: 'center',
        justifyContent: 'center',
        color: primaryTextWhite,
        flexGrow: '1',
        backgroundColor: greyShade,
      },
    };
  }
}
