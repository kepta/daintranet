import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';
import { CircularProgress } from 'material-ui';
import { fetchIntranet, fuzzySearch } from '../../network/Fetch';
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
        searchResult: false,
        searching: false,
      };
      this._bind('getDirectoryTree', 'goForward', 'goBack', 'setSearch', 'goToSearch');
      this.getDirectoryTree();
    }
    getDirectoryTree() {
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
    goToSearch(pathArg) {
      const pathString = pathArg.split('/');
      const path = [this.state.tree];
      pathString.forEach((subDir) => {
        path.push(path[path.length - 1][subDir]);
      });
      this.setState({
        searchResult: null,
        path,
        pathString,
        searching: false,
      });
    }
    setSearch(search) {
      if (search) {
        this.setState({
          searching: true,
        });
        fuzzySearch(search).then((resp, err) => {
          console.log(resp);
          // TODO if you press cancel while search is going
          if (err) {
            console.log(err);
            this.setState({
              searching: false,
            });
          }
          if (resp) {
            this.setState({
              searchResult: resp,
              searching: false,
            });
          }
        });
      } else {
        this.setState({
          searchResult: null,
        });
      }
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
                            timeStamp={this.state.timeStamp}
                            searchResult={this.state.searchResult}
                            setSearch={this.setSearch}
                            searching={this.state.searching}
                            goToSearch={this.goToSearch}
                          />
      );
    }
}
