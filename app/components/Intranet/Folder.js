import React from 'react';
import Base from '../Base';
import { List, RefreshIndicator } from 'material-ui';
import { flexCenter } from '../../Flex';
import { formQuery } from '../../network/Fetch';
import ListItem from './IconItems';
import ListItemMobile from './ListItem.mobile';
import { increment } from '../../network/firebase';

export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.style = this.style();
      this._bind('displayStructure', 'goForward', 'showAttachment');
    }
    goForward(item) {
      if (this.props.isMobile) {
        setTimeout(() => this.props.goForward(item), 400);
      } else {
        this.props.goForward(item);
      }
    }
    showAttachment(path, file) {
      let url = path.join('/');
      url = url + '/'+ file;
      this.props.showAttachment(url);
    }
    displayStructure(obj) {
      const params = {
        items: obj,
        goForward: this.goForward,
        showAttachment: this.showAttachment,
        pathString: this.props.pathString,
        path: this.props.path,
        isMobile: this.props.isMobile,
      };
      if (this.props.isMobile) {
        return <ListItemMobile {...params} />;
      }
      return (<ListItem {...params}/>);
      // });
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
      const statusDisplay = lastUpdated;
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
