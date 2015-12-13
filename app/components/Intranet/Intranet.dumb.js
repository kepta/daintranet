import React from 'react';
import Base from '../Base';

export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      const style = this.style();
      return (
        <div style={style.main}>
          <div style={{flexGrow: '1', backgroundColor: 'pink'}}>
              this
          </div>
        </div>
      );
    }
    style() {
      return {
        main: {
          display: 'flex',
          flexGrow: '1',
        },
      };
    }
}
