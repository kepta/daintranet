import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';
import { CircularProgress } from 'material-ui';
import { fetchIntranet } from '../../network/Fetch';
import ParseDate from '../../helper/dateParse';

export default class Inbox extends Base {
    constructor(props) {
      super(props);
      this.state = {
        tree: null,
        path: [],
        currentLocation: null,
        timeStamp: null
      };
      this._bind('getDirectoryTree', 'goForward');
      this.getDirectoryTree();
    }
    getDirectoryTree() {
      console.log(this.props.fresh);
      fetchIntranet(this.props.user, this.props.fresh).then((res, rej) => {
        if (rej) {
          // TODO: need to work on error, to let use press retry in case of fail
          return console.log(rej);
        }
        this.setState({
          tree: res.intranet,
          currentLocation: res.intranet,
          timeStamp: ParseDate.timeSince(res.timeStamp),
        });
      });
    }
    goForward(location) {
      const tempArray = this.state.path.slice(0);
      tempArray.push(location);
      this.setState({
        path: tempArray,
        currentLocation: this.state.currentLocation[location],
      });
    }
    render() {
      console.log(this.state.path);
      const progress = (
          <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div style={{ alignSelf: 'center' }}>
              <CircularProgress/>
            </div>
          </div>
      );
      return (
        !this.state.tree ? progress
                          : <IntranetDumb tree={this.state.tree}
                                          location={this.state.currentLocation}
                                          goForward={this.goForward}
                                          path={this.state.path}
                                          timeStamp={this.state.timeStamp}/>
      );
    }
}
