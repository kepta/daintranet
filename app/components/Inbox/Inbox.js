import React from 'react';
import InboxDumb from './Inbox.dumb';
import Base from '../Base';

export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    shouldComponentUpdate(nextProps) {
      // this code can be buggy
      // as we need to absolutely check if nextprops are different
      // can use require('react-addons-shallow-compare');
      const nextLen = nextProps.inbox.length - 1;
      const len = this.props.inbox.length - 1;
      if (nextProps.inbox[nextLen] === this.props.inbox[len]) {
        return false;
      }
      return true;
    }
    render() {
      console.log('rendering');
      return (
        <InboxDumb inbox={this.props.inbox} showEmail={this.props.showEmail}/>
      );
    }
}
