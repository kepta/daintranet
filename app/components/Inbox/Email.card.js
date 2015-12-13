import React from 'react';
import { Card, CardHeader, ListDivider, Avatar } from 'material-ui';
export default class EmailCard extends React.Component {
  constructor(props) {
    super(props);
  }
  createMarkup(html) {
    console.log(html);
    return { __html: '<iframe srcdoc='+html+'></iframe>' };
  }
  render() {
    const email = this.props.email;
    const style = this.style();
    const avatar = <Avatar>{email.from[0].name.slice(0, 2) || email.from[0].address.slice(0, 2)}</Avatar>;
    // const to = email.to.map((t) => t.address);
    const subtitle = <span>{email.from[0].address}<br/>{email.receivedDate.toString()}<br/></span>;
    return (
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
    );
  }
  style() {
    return {
      iframe: {
        width: '100%',
        height: '100%',
        marginLeft: '10px',
        display: 'flex',
      },
      iframeWrapper: {
        paddingRight: '10px',
      },
    };
  }
}
