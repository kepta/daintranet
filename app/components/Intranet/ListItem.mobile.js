import React from 'react';
import Base from '../Base';
import { FolderIcon, PdfIcon } from '../Icons';

export default class ListItemMobile extends Base {
    render() {
      const style = this.style();
      let showIcon;
      if (this.props.search || this.props.path.length > 2) {
        showIcon = <div style={style.icon}>{this.props.isFile ? <PdfIcon/> : <FolderIcon/>}</div>;
      } else {
        showIcon = null;
      }
      // console.log(this.props.item);
      return (
        <div
          className="list-mobile"
          style={style.main}
          onTouchTap={ this.props.isFile ?
          this.props.showAttachment.bind(this, this.props.pathString, this.props.item)
        : this.props.goForward.bind(this, this.props.item)}
        >
          <div style={style.content}>
            {showIcon}
            {this.props.item}
          </div>
        </div>
      );
    }
    style() {
      return {
        main: {
          paddingLeft: '30px',
          height: '68px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderBottom: 'solid 1px #e0e0e0',
        },
        content: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        icon: {
          marginRight: '7px',
        },
      };
    }
}
