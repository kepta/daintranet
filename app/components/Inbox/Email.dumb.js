import React from 'react';
import { Card, CardText, CardHeader, Avatar } from 'material-ui';
export default class DumbEmail extends React.Component {
  createMarkup(html) {
    console.log(html);
    return { __html: '<iframe srcdoc='+html+'></iframe>' };
  }
  render() {
    // console.log(this.props.email);
    const email = this.props.email.email;
    console.log(email);
    const style = this.style();
    const avatar = <Avatar>{email.from[0].name || email.from[0].address}</Avatar>;
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
        <CardText>
          <iframe srcDoc={email.html} frameBorder="0" style={style.iframe}/>
        </CardText>
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
