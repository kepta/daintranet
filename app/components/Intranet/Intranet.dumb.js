import React from 'react';
import Base from '../Base';
import { flexRow, flexGrow1, flexCenter, flexCol } from '../../flex';
import { LectureIcon, AcademicIcon } from '../Icons';
import Appbar from './Appbar';
import Folder from './Folder';

export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      const style = this.style();
      return (
        <div style={style.main}>
          <Appbar/>
          <Folder
            tree={this.props.tree}
            location={this.props.location}
            goForward={this.props.goForward}
            path={this.props.path}
            timeStamp={this.props.timeStamp}
            />
        </div>
      );
    }
    style() {
      return {
        main: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      };
    }
}

// <Tabs style={{ ...flexGrow1 }}>
//   <Tab label={<div style ={{...flexRow, ...flexCenter}}><LectureIcon/>Lecture</div>} style={style.intranet}>
//     <Professors />
//   </Tab>
//   <Tab label={<div style ={{...flexRow, ...flexCenter}}><AcademicIcon/>Academic</div>} style={style.intranet}>
//     <Academic />
//   </Tab>
//   <Tab
//     label="Item Three" style={style.starred}
//   />
// </Tabs>
