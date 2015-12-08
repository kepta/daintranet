import React from 'react';
import Inbox from './Inbox/Inbox';
import { Paper } from 'material-ui';
export default class DumbMainWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  showEmails(items) {
    return items.map((i, iter) => {
      return <div key={iter}>{JSON.stringify(i)}</div>;
    });
  }
  render() {
    const style = this.style();
    return (
       <Paper zDepth={1} style={style}>
        <Inbox inbox={this.props.inbox} emails={this.props.emails} />
      </Paper>
    );
  }
  style() {
    return {
      width: '250px',
      height: '96vh',
    };
  }
}
