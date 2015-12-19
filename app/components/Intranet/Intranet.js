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
        pathString: [],
        timeStamp: null,
        previous: null,
      };
      this._bind('getDirectoryTree', 'goForward', 'goBack');
      this.getDirectoryTree();
    }
    getDirectoryTree() {
      // console.log(this.props.fresh);
      fetchIntranet(this.props.user, this.props.fresh).then((res, rej) => {
        if (rej) {
          // TODO: need to work on error, to let use press retry in case of fail
          return console.log(rej);
        }
        this.setState({
          tree: res.intranet,
          path: new Array(res.intranet),
          timeStamp: ParseDate.timeSince(res.timeStamp),
        });
      });
    }
    goForward(location) {
      const tempArray = this.state.path.slice(0);
      const tempPathString = this.state.pathString.slice(0);
      tempPathString.push(location);
      tempArray.push(this.state.path[this.state.path.length - 1][location]);
      this.setState({
        path: tempArray,
        pathString: tempPathString,
      });
    }
    goBack() {
      if (this.state.path.length === 1) return;
      const tempArray = this.state.path.slice(0, this.state.path.length - 1);
      const tempPathString = this.state.pathString.slice(0, this.state.pathString.length - 1);
      this.setState({
        path: tempArray,
        pathString: tempPathString,
      });
    }
    render() {
      console.log(this.state.path[this.state.path.length - 1]);
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
                                          location={this.state.path[this.state.path.length - 1]}
                                          goForward={this.goForward}
                                          path={this.state.path}
                                          pathString={this.state.pathString}
                                          goBack={this.goBack}
                                          timeStamp={this.state.timeStamp}/>
      );
    }
}
