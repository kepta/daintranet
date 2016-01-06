import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';
import { CircularProgress } from 'material-ui';
import { fetchIntranet, fuzzySearch, formQuery } from '../../network/Fetch';
import ParseDate from '../../helper/dateParse';
import { increment, readTopFolders } from '../../network/firebase';
readTopFolders();
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
      this._bind('getDirectoryTree', 'goForward', 'goBack', 'setSearch', 'goToSearch', 'showAttachment');
      this.getDirectoryTree();
    }
    getDirectoryTree() {
      fetchIntranet(this.props.user, this.props.fresh).then((res, rej) => {
        if (rej) {
          // TODO: need to work on error, to let use press retry in case of fail
          return console.error(rej);
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
      if (tempPathString.length === 3) {
        // @recording: only increment if a subfolder inside prof
        increment(tempPathString.join('*'), this.props.user);
      }
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
          // TODO if you press cancel while search is going
          if (err) {
            console.error(err);
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
    showAttachment(path, file) {
      let url;
      if (file === null) {
        // this is the case when we get direct path from search.js
        url = path.slice(15);
      } else {
        url = path.join('/');
        // increment(path.join('*'), )
        url = url + '/'+ file;
      }
      // console.log(url.replace('/', '*'));
      window.open(formQuery(url), '_blank');
      increment(url.replace(/\//g, '*').replace('.', '^'), this.props.user);
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
                            isMobile={this.props.isMobile}
                            leftNav={this.props.leftNav}
                            showAttachment={this.showAttachment}
                          />
      );
    }
}
