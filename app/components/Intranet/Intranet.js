import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';

export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <IntranetDumb/>
      );
    }
}
