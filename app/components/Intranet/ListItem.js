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
          <ListItem style={style.listItem}
            primaryText={this.props.item}
            onTouchTap={ this.props.isFile ?
              this.props.showAttachment.bind(this, this.props.pathString, this.props.item)
            : this.props.goForward.bind(this, this.props.item)}
            leftIcon={<Avatar {...avatarProps}/>}
          />
          <ListDivider inset/>
        </div>
      );
    }
    style() {
      return {
        avatar: {
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: '#ec407a',
          textAlign: 'center',
          lineHeight: '47px',
          fontSize: '24px',
          color: '#ffcc80',
          position: 'absolute',
          top: '8px',
          left: '16px',
          WebkitUserSelect: 'none',
          padding: '0 !important',
        },
      };
    }
}
