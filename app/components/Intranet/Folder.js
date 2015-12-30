import React from 'react';
import Base from '../Base';
import { List, RefreshIndicator } from 'material-ui';
import { flexCenter } from '../../Flex';
import { formQuery } from '../../network/Fetch';
import ListItem from './ListItem';
import ListItemMobile from './ListItem.mobile';
export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.style = this.style();
      this._bind('displayStructure', 'goForward');
    }
    goForward(item) {
      setTimeout(() => this.props.goForward(item), 400);
    }
    showAttachment(path, file) {
      console.log(path, file);
      let url = path.join('/');
      url = url + '/'+ file;
      window.open(formQuery(url), '_blank');
    }
    displayStructure(obj) {
      return Object.keys(obj).map((item, key) => {
        const isFile = obj[item] === 'file';
        const params = {
          key,
          isFile,
          item,
          goForward: this.goForward,
          showAttachment: this.showAttachment,
          pathString: this.props.pathString,
          path: this.props.path,
        };
        if (this.props.isMobile) {
          return (<ListItemMobile {...params}/>);
        }
        return (<ListItem {...params}/>);
      });
    }
    render() {
      const lastUpdated = (
        <span>
          Last updated &nbsp;{this.props.timeStamp} &nbsp; ago
        </span>
      );
      const refresh = (
        <RefreshIndicator size={40} left={5} top={5} style={{ position: 'relative' }} status="loading" />
      );
      const statusDisplay = this.props.searching ? refresh : lastUpdated;
      return (
          <div style={this.style.main} id="scroller">
            <div style={{ ...this.style.updated, ...flexCenter }}>
              {statusDisplay}
            </div>
            <List style={this.style.list}>
              {this.displayStructure(this.props.location)}
            </List>
          </div>
      );
    }
    style() {
      return {
        main: {
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        },
        list: {
        },
        listItem: {
          paddingTop: '10px',
          paddingBottom: '10px',
        },
        updated: {
          color: 'grey',
          fontSize: '0.75em',
          display: 'flex',
          marginTop: '5px',
        },
        avatarFile: {
          backgroundColor: '#9c27b0',
        },
      };
    }
}
