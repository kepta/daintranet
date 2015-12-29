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
    goForward(item) {
      this.props.goForward(item);
    }
    showAttachment(path, file) {
      console.log(path, file);
      let url = path.join('/');
      url = url + '/'+ file;
      window.open(formQuery(url), '_blank');
    }
    displayStructure(obj) {
      console.log(obj);
      return Object.keys(obj).map((item, key) => {
        const isFile = obj[item] === 'file';
        if (isFile) {
          return (
            <div key={key} onTouchTap={this.showAttachment.bind(this, this.props.pathString, item)}>
              <ListItem style={this.style.listItem}
                primaryText={item}
                leftIcon={<Avatar style={{ ...this.style.avatar, ...this.style.avatarFile }} icon={<PdfIcon/> }/>}
              />
              <ListDivider inset/>
          </div>
          );
        }
        return (
          <div key={key} onTouchTap={this.goForward.bind(this, item)}>
              <ListItem style={this.style.listItem}
                primaryText={item}
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
          Last updated &nbsp;{this.props.timeStamp} &nbsp; ago
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
