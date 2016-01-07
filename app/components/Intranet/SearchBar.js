import React from 'react';
import Base from '../Base';
import { HomeIcon, SearchIcon, HotIcon } from '../Icons';
import { primaryTextWhite, greyShade, baseColor } from '../../helper/colorPallete.js';
import { AppBar, TextField, Toolbar, IconButton, ToolbarGroup, ListDivider, Paper } from 'material-ui';
import { BackButton, CloseGrey } from '../Icons';

export default class Viewer extends Base {
  giveStyle(style, tab) {
    return {
      ...style,
      borderBottom: tab ? '3px solid '+ baseColor : '0px',
    };
  }
  handleClick(type) {
    this.props.handleClick({
      search: type === 'search',
      hot: type === 'hot',
      home: type === 'home',
    });
  }
  render() {
    const style = this.style();
    return (
      <div style={style.main}>
        <div style={this.giveStyle(style.tab, this.props.search)} onClick={this.handleClick.bind(this, 'search')}>
          <SearchIcon/>
        </div>
        <div style={this.giveStyle(style.tab, this.props.hot)} onClick={this.handleClick.bind(this, 'hot')}>
          <HotIcon/>
        </div>
        <div style={this.giveStyle(style.tab, this.props.home)} onClick={this.handleClick.bind(this, 'home')}>
          <HomeIcon/>
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
