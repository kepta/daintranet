import React from 'react';
import Base from '../Base';
import { ListItem, Avatar, ListDivider } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';

export default class Item extends Base {
    onTouchTap(self, isFile, props, item) {
      return isFile ?
      props.showAttachment.bind(self, props.pathString, item)
    : props.goForward.bind(self, item, props.pathString);
    }
    render() {
      const style = this.style(this.props.isMobile);
      const obj = this.props.items;
      console.log(obj);
      const list = Object.keys(obj).map((item, key) => {
        const isFile = obj[item] === 'file';
        return (
          <div style={style.list} key={key}
            onTouchTap={ this.onTouchTap(this, isFile, this.props, item)}
          >
            <div style={style.listItem}>
                <div style={style.icon}>
                  { isFile ? <PdfIcon style={{ fill: '#ff8a65', height: '64px', width: '64px' }}/>
                : <FolderIcon style={{ fill: '#ffcc80', height: '64px', width: '64px' }}/>}
                </div>
                <div>
                    {item}
                </div>
            </div>
        </div>
      );
      });
      list.push(<div key={900} style={style.list}></div>);
      list.push(<div key={901} style={style.list}></div>);
      list.push(<div key={902} style={style.list}></div>);
      return <div style={style.wrapper}>{list}</div>;
    }
    style(isMobile) {
      return {
        wrapper: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        },
        list: {
          width: isMobile ? '110px' : '15vw',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          margin: '20px',
        },
        listItem: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: isMobile ? '13px' : '16px',
          wordWrap: 'break-word',
          textAlign: 'center',
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
