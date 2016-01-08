import React from 'react';
import Base from '../Base';
import { ListItem, Avatar, ListDivider } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';

export default class Item extends Base {
    onTouchTap(self, isFile, props, item, pathString) {
      return isFile ?
      props.showAttachment.bind(self, props.pathString || pathString, item)
    : props.goForward.bind(self, item, props.pathString || pathString);
    }
    render() {
      const style = this.style();
      let obj = this.props.items;
      // console.log(this.props.fromSearch);
      let grid;
      const fromSearch = this.props.fromSearch;
      if (fromSearch) {
        grid = this.props.items;
      } else {
        grid = Object.keys(obj);
      }
      console.log(grid);
      const list = grid.map((item, key) => {
        //   const isFile = item.name.indexOf('.') > -1;
        // console.log(item);
        let isFile;
        let name = item;
        if (fromSearch) {
          item.path.lastIndexOf('/');
          name = item.path.slice(item.path.lastIndexOf('/')+1);
          console.log(name);
          isFile = name.indexOf('.') > -1 ;
        } else {
          isFile = obj[item] === 'file';
        }
        // const isFile = fromSearch ? item.path.indexOf('.') > -1 : obj[item] === 'file';
        return (
          <div style={style.wrapper} key={key}
            onTouchTap={ this.onTouchTap(this, isFile, this.props, item, item.path)}
          >
            <div style={style.listItem}>
                <div style={style.icon}>
                  { isFile ? <PdfIcon style={{ fill: '#ff8a65', height: '64px', width: '64px' }}/>
                : <FolderIcon style={{ fill: '#ffcc80', height: '64px', width: '64px' }}/>}
                </div>
                <div>
                    {name}
                </div>
            </div>
          </div>
        );
      });
      // console.log(list);
      return <div>{list}</div>;
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
