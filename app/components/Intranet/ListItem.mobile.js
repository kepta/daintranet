import React from 'react';
import Base from '../Base';

import { FolderIcon, PdfIcon } from '../Icons';

export default class ListItemMobile extends Base {

    render() {
      const style = this.style();
      const obj = this.props.items;
      const grid = Object.keys(obj);
      const list = grid.map((item, key) => {
        const isFile = obj[item] === 'file';
        // console.log(isFile);
        let showIcon;
        if (this.props.path.length > 2) {
          showIcon = <div style={style.icon}>{isFile ? <PdfIcon style={{ fill: '#ff8a65' }}/> : <FolderIcon style={{ fill: '#ffcc80' }}/>}</div>;
        } else {
          showIcon = null;
        }
        return (
          <div
            key={key}
            className="list-mobile"
            style={style.main}
            onTouchTap={ isFile ?
            this.props.showAttachment.bind(this, this.props.pathString, item)
          : this.props.goForward.bind(this, item)}
          >
            <div style={style.content}>
              {showIcon}
              {item}
            </div>
          </div>
        );
      });
      list.push(<div key={9999} style={{ ...style.main, borderBottom: 'solid 0px' }}/>);
      list.push(<div key={9998} style={{ ...style.main, borderBottom: 'solid 0px' }}/>);
      return <div>{list}</div>;
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
