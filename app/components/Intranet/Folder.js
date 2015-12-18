import React from 'react';
// import ProfDumb from './Professors.dumb';
import Base from '../Base';
import { ListItem, List, Avatar, ListDivider } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';
import { flexCenter } from '../../Flex';
import { formQuery } from '../../network/Fetch';
// let parseDate = new ParseDate();
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
      // console.log(url);
      window.open(formQuery(url), '_blank');
    }
    displayStructure(obj) {
      console.log(obj);
      return Object.keys(obj).map((item, key) => {
        const isFile = obj[item] === 'file';
        if (isFile) {
          return (
            <div key={key} onClick={this.showAttachment.bind(this, this.props.path, item)}>
              <ListItem style={this.style.listItem}
                      primaryText={item}
                      leftIcon={<Avatar style={this.style.avatarFile} icon={<PdfIcon/> }/>}
                      />
              <ListDivider inset={true}/>
          </div>
          );
        }
        return (
          <div key={key} onClick={this.goForward.bind(this, item)}>
              <ListItem style={this.style.listItem}
                            primaryText={item}
                            leftIcon={<Avatar style={this.style.avatar} icon={<FolderIcon/> }/>}
                            />
              <ListDivider inset={true}/>
          </div>
          );
      });
    }
    render() {
      return (
        <div style={this.style.main}>
          <div style={{ ...this.style.updated, ...flexCenter }}>
            Last updated &nbsp;{this.props.timeStamp} &nbsp; ago
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
          marginTop: '10px',
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
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: '#9c27b0',
          textAlign: 'center',
          lineHeight: '47px',
          fontSize: '24px',
          color: '#9c27b0',
          position: 'absolute',
          top: '8px',
          left: '16px',
          WebkitUserSelect: 'none',
          padding: '0 !important',
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
      }
    }
}
