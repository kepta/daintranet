import React from 'react';
import { AppBar, IconMenu, IconButton } from 'material-ui';
import { Attachments, Close } from '../Icons';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Email extends React.Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
  }
  openAttachment(url, k) {
    window.open(url, '_blank');
  }
  showAttachments(atc) {
    if (!atc || atc.length === 0) {
      return null;
    }
    const attachmentsList = atc.map((a, it) => {
      const blob = new Blob([a.content], { type: a.contentType });
      const downloadUrl = URL.createObjectURL(blob);

      return (
        <MenuItem
          primaryText={a.fileName}
          key={it}
          onTouchTap={this.openAttachment.bind(this, downloadUrl)}
        />
      );
    });
    return (
      <IconMenu
        iconButtonElement={<IconButton tooltip="attachments">
                              <Attachments/>
                           </IconButton>}
      >
        {attachmentsList}
      </IconMenu>
    );
  }
  handleHide() {
    this.props.hide(null);
  }
  render() {
    // console.log(this.props.email);
    const email = this.props.email;
    console.log(email);
    return (
        <AppBar
          title={email.subject.slice(0, 40)}
          iconElementLeft={<IconButton tooltip="close" onTouchTap={this.handleHide}>
                              <Close/>
                           </IconButton>}
          iconElementRight={this.showAttachments(email.attachments)}
        />
    );
  }
}
