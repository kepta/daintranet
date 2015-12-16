import React from 'react';
// import ProfDumb from './Professors.dumb';
import Base from '../Base';

export default class Viewer extends Base {
    constructor(props) {
      super(props);
      this.state = {
        currentLocation: ''
      };
    }
    getLocation() {

    }
    render() {
      return (
        <div>helolo
          <a href="http://128.199.173.123:3000/api/intranet/23?loc=/Lecture/8-86.pdf">click here</a>
        </div>
      );
    }
}
