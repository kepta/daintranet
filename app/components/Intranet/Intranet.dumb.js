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
          <div style={style.appbar}>
              <div>
                hello
              </div>
              <div>
                hello

              </div>
              <div>
                hello

              </div>
          </div>
        </div>
      );
    }
    style() {
      return {
        main: {
          display: 'flex',
        },
        appbar: {
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
        },
      };
    }
}
