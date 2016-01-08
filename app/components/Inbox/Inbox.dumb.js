import React from 'react';
import { List, ListItem, ListDivider, Avatar } from 'material-ui';
// import Helper from '../Helpers/helper';
// import User from '../Helpers/user.info';
import { primaryTextBlack, secTextBlack } from '../../helper/colorPallete';
import Base from '../Base';
// let helper = new Helper();

export default class SideBar extends Base {
    constructor(props) {
      super(props);
      this.state = {
        mails: [],
      };
      this.populateInbox = this.populateInbox.bind(this);
      this.style= this.style();
    }
    populateInbox(mailArg) {
      return mailArg.map((mail, iter) => {
        const secondaryText = (
          <p>
            <span style={{ color: secTextBlack }}> { mail.su } </span>
          </p>
        );
        // console.log(mail);
        const fromIcon = mail.e && mail.e[mail.e.length-1].a;
        const from = mail.e && mail.e[mail.e.length-1];
        return (
          <div key={iter} onTouchTap={this.props.showEmail.bind(this, mail.id)}>
            <ListItem
              primaryText={<span style={{ textTransform: 'capitalize', color: primaryTextBlack }}> {from.p || from.d || from.a}</span>}
              secondaryText={secondaryText}
              secondaryTextLines={2}
              leftAvatar={
                <Avatar>
                  { fromIcon[0].toUpperCase()}
                </Avatar>
              }
            />
            <ListDivider/>
          </div>
        );
      });
    }
    render() {
      return (
            <div style={this.style.main}>
                <List subheader="Webmail">
                  <ListDivider/>
                </List>
                <List style={this.style.inbox}>
                  {this.populateInbox(this.props.inbox)}
                </List>
            </div>
      );
    }
    style() {
      return {
        main: {
          height: '100%',
          wordWrap: 'break-word',
          paddingLeft: '0',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',
          padding: '0',
        },
        inbox: {
          overflowY: 'scroll',
        },
      };
    }
}
