import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';
import { CircularProgress } from 'material-ui';
import { fetchIntranet } from '../../network/Fetch';

export default class Inbox extends Base {

    constructor(props) {
      super(props);
      this.state = {
        tree: null,
        location: [],
        currentLocation: null,
      };
      this._bind('getDirectoryTree', 'changeLocation');
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
          tree: res,
          currentLocation: res,
        });
      });
    }
    changeLocation(currentLocation) {
      this.setState({
        currentLocation,
      });
    }
    render() {
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
                                          changeLocation={this.changeLocation}/>
      );
    }
}
