import React from 'react';
import ProfDumb from './Professors.dumb';
import Base from '../Base';

export default class Prof extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <ProfDumb/>
      );
    }
}
