import React from 'react';
import EmailList from './EmailItem';
import { List, ListItem, ListDivider, Avatar } from 'material-ui';
// import Helper from '../Helpers/helper';
// import User from '../Helpers/user.info';
import Base from '../Base';
// let helper = new Helper();

export default class SideBar extends Base {
    constructor(props) {
      super(props);
      this.state = {
        mails: [],
        loaded: false,
      };
      this.populateInbox = this.populateInbox.bind(this);
      this.styles= this.styles();
    }
    populateInbox(mailArg) {
      return mailArg.map((mail, iter) => {
        const secondaryText = (
          <p>
            <span style={{ color: 'black' }}> { mail.su } </span><br/>
            {mail.fr}
          </p>
        );
        console.log(mail.e);
        // mail.e contains a big array with a, d, p, t , currently just showing email
        return (
          <div key={iter}>
            <ListItem
            primaryText={mail.e[0].p}
            secondaryText={secondaryText}
            secondaryTextLines={3}
            leftAvatar={<Avatar>K</Avatar>}
            />
            <ListDivider/>
          </div>
        );
      }).reverse();
    }
    render() {
      return (
            <div style={this.styles} className="mui-col-sm-4 mui-col-md-4">
                <List>
                  {this.populateInbox(this.props.inbox)}
                </List>
            </div>
      );
    }
    styles() {
      return {
        height: '100%',
        wordWrap: 'break-word',
        paddingLeft: '0',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        padding: '0',
      };
    }
}
