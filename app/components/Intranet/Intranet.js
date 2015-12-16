import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';
import { CircularProgress } from 'material-ui';
import { getIntranet } from '../../network/Fetch';

export default class Inbox extends Base {

    constructor(props) {
      super(props);
      this.state = {
        tree: null,
      };
      this._bind('getDirectoryTree');
      this.getDirectoryTree();
    }
    getDirectoryTree() {
      getIntranet(this.props.user).then((res, rej) => {
        if (rej) {
          // TODO: need to work on error
          return console.log(rej);
        }
        this.setState({
          tree: res,
        });
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
        this.state.tree ? <IntranetDumb/> : progress
      );
    }
}
