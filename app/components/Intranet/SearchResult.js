import React from 'react';
import Base from '../Base';
import { List } from 'material-ui';
// import { PdfIcon } from '../Icons';
import ListItem from './ListItem';
// import ListItemMobile from './ListItem.mobile';
import { flexCenter } from '../../Flex';
import { increment } from '../../network/firebase';

export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.style = this.style();
      this._bind('displayStructure', 'goForward', 'showAttachment');
    }
    goForward(x, item) {
      this.props.goToStringPath(item.slice(15));
    }
    showAttachment(x) {
      this.props.showAttachment(x.slice(15));
    }
    displayStructure(array) {
      // console.log('here', array);
      if (array) {
        return (
          <ListItem
            items={array}
            goForward={this.goForward}
            showAttachment={this.showAttachment}
            fromSearch
          />
        );
      }
      return null;
    }
    render() {
      return (
        <div style={this.style.main}>
          <List style={this.style.list}>
            {this.displayStructure(this.props.searchResult)}
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
          marginTop: '12px',
        },
        avatarFile: {
          backgroundColor: '#9c27b0',
        },
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
