import React from 'react';
import Base from '../Base';
import { ListItem, List, Avatar, ListDivider, RefreshIndicator } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';
import { flexCenter } from '../../Flex';
import { formQuery } from '../../network/Fetch';
export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.style = this.style();
      this._bind('displayStructure', 'goForward');
    }
    goForward(path) {
      this.props.goToSearch(path.slice(15));
    }
    showAttachment(path) {
      // console.log(path, file);
      const url = path.slice(15); // /root/intranet/
      window.open(formQuery(url), '_blank');
    }
    displayStructure(array) {
      console.log(array);
      return array.map((item, key) => {
        const isFile = item.name.indexOf('.') > -1;
        if (isFile) {
          return (
            <div key={key} onTouchTap={this.showAttachment.bind(this, item.path)}>
              <ListItem style={this.style.listItem}
                primaryText={item.name}
                leftIcon={<Avatar style={{ ...this.style.avatar, ...this.style.avatarFile }} icon={<PdfIcon/> }/>}
              />
              <ListDivider inset/>
          </div>
          );
        }
        return (
          <div key={key} onTouchTap={this.goForward.bind(this, item.path)}>
              <ListItem style={this.style.listItem}
                primaryText={item.name}
                leftIcon={<Avatar style={this.style.avatar} icon={<FolderIcon/> }/>}
              />
              <ListDivider inset/>
          </div>
          );
      });
    }
    render() {
      const lastUpdated = (
        <span>
          Search Results
        </span>
      );
      const refresh = (
        <RefreshIndicator size={40} left={5} top={5} style={{ position: 'relative' }} status="loading" />
      );
      const statusDisplay = this.props.searching ? refresh : lastUpdated;
      return (
        <div style={this.style.main}>
          <div style={{ ...this.style.updated, ...flexCenter }}>
            {statusDisplay}
          </div>
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
