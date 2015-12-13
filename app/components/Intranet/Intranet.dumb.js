import React from 'react';
import Base from '../Base';
import { flexRow, flexGrow1 } from '../../flex';
import { List, Tabs, Tab } from 'material-ui';
import Professors from './Professors';
export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      const style = this.style();
      return (
        <div style={style.main}>
          <div style={style.appbar}>
            <Tabs style={{ ...flexGrow1 }}>
              <Tab label={<div>style</div>} style={style.hot}>
                This is hot
              </Tab>
              <Tab label="Item Two" style={style.intranet}>
                <Professors />
              </Tab>
              <Tab
                label="Item Three" style={style.starred}
              />
            </Tabs>
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
          display: 'flex',
          flexGrow: '1',
        },
        hot: {
          backgroundColor: '#B6B6B6',

        },
        intranet: {
          backgroundColor: '#B6B6B6',
        },
        starred: {
          backgroundColor: '#B6B6B6',

        }
      };
    }
}
