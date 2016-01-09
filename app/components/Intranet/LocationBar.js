import React from 'react';
import Base from '../Base';
import { primaryTextWhite, greyShade, toolbarGray, darkGray } from '../../helper/colorPallete.js';
import { TextField } from 'material-ui';
import { CloseOther, PdfIcon } from '../Icons';

export default class LocationBar extends Base {
  handleClick(key) {
    return this.props.goToStringPath(this.props.pathString.slice(0, key+1).join('/'));
  }
  render() {
    const locations = this.props.pathString.map((loc, key) => {
      return <span key={key} onTouchTap={this.handleClick.bind(this, key)}> {loc} /</span>;
    });
    return (
      <div style={{ fontSize: '16px', cursor: 'pointer' }}>
        {locations}
      </div>
    );
  }
}
