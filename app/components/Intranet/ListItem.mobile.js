import React from 'react';
import Base from '../Base';

export default class ListItemMobile extends Base {
    render() {
      const style = this.style();
      return (
        <div
          className="list-mobile"
          style={style}
          onTouchTap={ this.props.isFile ?
          this.props.showAttachment.bind(this, this.props.pathString, this.props.item)
        : this.props.goForward.bind(this, this.props.item)}
        >
          {this.props.item}
        </div>
      );
    }
    style() {
      return {
        paddingLeft: '30px',
        height: '68px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottom: 'solid 1px #e0e0e0',
      };
    }
}
