import React from 'react';
// import ProfDumb from './Professors.dumb';
import Base from '../Base';
import { ListItem, List, Avatar, ListDivider } from 'material-ui';
import { FolderIcon } from '../Icons';
export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.style = this.style();
      this._bind('displayStructure');
    }
    displayStructure(obj) {
      console.log(obj);
      return Object.keys(obj).map((item, key) => {
        return (
          <div key={key}>
              <ListItem
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
        <div>
          <div style={this.style.updated}>
            Last Updated: 1 hour ago
          </div>
          <List>
            {this.displayStructure(this.props.location)}
          </List>
        </div>
      );
    }
    style() {
      return {
        updated: {
          color: 'grey',
          fontSize: '1em',
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
