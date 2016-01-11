import React from 'react';
import Base from '../Base';
import { primaryTextWhite, greyShade, toolbarGray, darkGray } from '../../helper/colorPallete.js';
import { TextField } from 'material-ui';
import { CloseOther, PdfIcon } from '../Icons';

export default class SearchBar extends Base {
  componentDidMount() {
    if (!this.props.isMobile) {
      this.refs.search.focus();
    }
  }
  handleEnter(e) {
    e.blur();
    console.log('enter');
  }
  render() {
    const style = this.style();
    return (
        <div style={style}>
          <TextField
            ref="search"
            hintText="Search "
            fullWidth
            underlineFocusStyle={{ borderColor: 'rgb(212, 212, 212)' }}
            onChange={this.props.handleSearchChange}
            onEnterKeyDown={(e) => e.target.blur()}
          />
        </div>
    );
  }
  style() {
    return {
      flexGrow: '1',
    };
  }
}
