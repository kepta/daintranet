import React from 'react';
import Base from '../Base';
import { flexRow, flexGrow1, flexCenter } from '../../flex';
import { List, Tabs, Tab, IconButton } from 'material-ui';
import { LectureIcon, AcademicIcon } from '../Icons';
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
              <Tab label={<div style ={{...flexRow, ...flexCenter}}><LectureIcon/>Lecture</div>} style={style.hot}>
                <Professors />
              </Tab>
              <Tab label={<div style ={{...flexRow, ...flexCenter}}><AcademicIcon/>Academic</div>} style={style.intranet}>
                helo
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
