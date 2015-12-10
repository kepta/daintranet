import React from 'react';
import { Card, CardText, CardHeader, Avatar, AppBar, IconMenu, IconButton, ContentInbox, ListDivider } from 'material-ui';
import { Attachments, Close } from '../Icons';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class DumbEmail extends React.Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
  }
  createMarkup(html) {
    console.log(html);
    return { __html: '<iframe srcdoc='+html+'></iframe>' };
  }
  openAttachment(url, k) {
    window.open(url, '_blank');
  }
  showAttachments(atc) {
    if (!atc || atc.length === 0) {
      return null;
    }
    return (
      <IconMenu iconButtonElement={
          <IconButton tooltip="attachments"><Attachments /></IconButton>
      }>{
    atc.map((a, it) => {
      const blob = new Blob([a.content], { type: a.contentType });
      const downloadUrl = URL.createObjectURL(blob);
      return <MenuItem primaryText={a.fileName} key={it} onClick={this.openAttachment.bind(this, downloadUrl)}/>;
    })
    }
  </IconMenu>);
  }
  handleHide() {
    console.log('here');
    this.props.hide(null);
  }

  render() {
    // console.log(this.props.email);
    const email = this.props.email.email;
    console.log(email);
    const style = this.style();
    const avatar = <Avatar>{email.from[0].name.slice(0, 2) || email.from[0].address.slice(0, 2)}</Avatar>;
    const to = email.to.map((t) => t.address);
    const subtitle = <span>{email.from[0].address}<br/>{email.receivedDate.toString()}<br/></span>;
    const node = document.createElement('iframe');
    return (
      <div style={style.main}>
        <AppBar
          title={email.subject.slice(0, 40)}
          iconElementLeft={<IconButton tooltip="close" onClick={this.handleHide}><Close/></IconButton>}
          iconElementRight={
          this.showAttachments(email.attachments)
        }/>
      <Card>
        <CardHeader
         title={email.from[0].name}
         subtitle={subtitle}
         avatar={avatar}
         />
       <ListDivider/>
          <div style={style.iframeWrapper}>
            <iframe srcDoc={email.html || email.text} frameBorder="0" style={style.iframe}/>
          </div>
          </Card>
      </div>
    );
  }
  style() {
    return {
      flexRow: {
        display: 'flex',
        flexDirection: 'row',
      },
      main: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // overflowY: 'scroll',
      },
      iframe: {
        width: '100%',
        height: '100%',
        marginLeft: '10px',
        display: 'flex',
      },
      iframeWrapper: {
        paddingRight: '10px',
      },
      close: {
        position: 'relative',
      },
      cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    };
  }
}
