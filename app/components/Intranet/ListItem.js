import React from 'react';
import Base from '../Base';
import { ListItem, Avatar, ListDivider } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';

export default class Item extends Base {
    render() {
      const style = this.style();
      const avatarProps = {
        style: {
          ...style.avatar,
          backgroundColor: this.props.isFile ? '#9c27b0' : '#ec407a',
        },
        icon: this.props.isFile ? <PdfIcon/> : <FolderIcon/>,
      };
      return (
        <div>
          <div style={style.listItem}
            onTouchTap={ this.props.isFile ?
              this.props.showAttachment.bind(this, this.props.pathString, this.props.item)
            : this.props.goForward.bind(this, this.props.item, this.props.pathString)}
          >
          <FolderIcon style={style.avatar} />
            {this.props.item}
            <ListDivider inset/>
          </div>
        </div>
      );
    }
    style() {
      return {
        fill: "#ffcc80",
      };
    }
}
