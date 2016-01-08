import React from 'react';
import Base from '../Base';
import { ListItem, Avatar, ListDivider } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';

export default class Item extends Base {
    render() {
      const style = this.style();
      const avatarProps = {
        style: style.avatar,
        icon: this.props.isFile ? <PdfIcon/> : <FolderIcon/>,
      };
      return (
        <div style={style.wrapper} className="list-intranet"
          onTouchTap={ this.props.isFile ?
          this.props.showAttachment.bind(this, this.props.pathString, this.props.item)
        : this.props.goForward.bind(this, this.props.item, this.props.pathString)}
        >
            <div style={style.listItem}>
                <div style={style.icon}>
                  { this.props.isFile ? <PdfIcon style={{ fill: '#9c27b0' }}/> : <FolderIcon style={{ fill: '#ffcc80' }}/>}
                </div>
                <div>
                    {this.props.item}
                </div>
            </div>
        </div>
      );
    }
    style() {
      return {
        wrapper: {
          borderBottom: 'solid 1px #e0e0e0',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        },
        listItem: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        avatar: {
          fill: "#ffcc80",
        },
        icon: {
          width: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      };
    }
}
