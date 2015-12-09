import React from 'react';
import { Card, CardText, CardHeader, Avatar } from 'material-ui';

export default class DumbEmail extends React.Component {
  createMarkup(html) {
    console.log(html);
    return { __html: '<iframe srcdoc='+html+'></iframe>' };
  }
  uint8ToString(u8a){
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    return c.join("");
  }
  showAttachments(atc) {
    if (!atc || atc.length === 0) {
      return null;
    }
    return atc.map((a, it) => {
      const blob = new Blob([a.content], { type: a.contentType });
      const downloadUrl = URL.createObjectURL(blob);
      return <a href={downloadUrl} key={it} target="_blank">{a.fileName}</a>;
    });
  }
  render() {
    // console.log(this.props.email);
    const email = this.props.email.email;
    console.log(email);
    const style = this.style();
    const avatar = <Avatar>{email.from[0].name.slice(0, 2) || email.from[0].address.slice(0, 2)}</Avatar>;
    const to = email.to.map((t) => t.address);
    const subtitle = <span>{email.from[0].name}<br/>{email.from[0].address}</span>;
    const node = document.createElement('iframe');
    node.setAttribute('srcdoc', email.html);
    return (
      <div style={style.main}>
        <Card>
          <CardHeader
           title={email.subject}
           subtitle={subtitle}
           avatar={avatar}/>
        </Card>
          <iframe srcDoc={email.html} frameBorder="0" style={style.iframe}/>
          {this.showAttachments(email.attachments)}
      </div>
    );
  }
  style() {
    return {
      main: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // overflowY: 'scroll',
      },
      iframe: {
        width: '100%',
        height: '100%',
      },
    };
  }
}
