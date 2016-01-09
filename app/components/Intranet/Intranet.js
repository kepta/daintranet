import React from 'react';
import IntranetDumb from './Intranet.dumb';
import Base from '../Base';
import { CircularProgress } from 'material-ui';
import { fetchIntranet, fuzzySearch, formQuery } from '../../network/Fetch';
import ParseDate from '../../helper/dateParse';
import { increment } from '../../network/firebase';
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
        search: false,
        home: true,
        hot: false,
      };
      this._bind('getDirectoryTree', 'goForward', 'goBack',
                'setSearch', 'goToStringPath', 'showAttachment',
                'handleTabChange');
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
        increment(tempPathString.join('*').replace(/\./g, '^'), this.props.user);
      }
      this.setState({
        path: tempArray,
        pathString: tempPathString,
        search: false,
        home: true,
        hot: false,
        searching: false,
      });
    }
    goToStringPath(pathArg) {
      console.log(pathArg);
      const pathString = pathArg.split('/');
      const path = [this.state.tree];
      console.log(path, pathString);
      pathString.forEach((subDir) => {
        path.push(path[path.length - 1][subDir]);
      });
      this.setState({
        path,
        pathString,
        searching: false,
        search: false,
        home: true,
        hot: false,
      });
    }
    handleTabChange(type) {
      this.setState(type);
    }
    setSearch(search) {
      this.setState({
        searching: true,
      });
      fuzzySearch(search).then((resp, err) => {
        // TODO if you press cancel while search is going
        if (err && this.state.search) {
          console.error(err);
          this.setState({
            searching: false,
            searchResult: null,
          });
        }
        if (resp && this.state.search) {
          this.setState({
            searchResult: resp,
            searching: false,
          });
        }
      });
    }
    showAttachment(path, file) {
      window.open(formQuery(path), '_blank');
      increment(path.replace(/\//g, '*').replace(/\./g, '^'), this.props.user);
    }
    goBack() {
      if (this.state.path.length === 1) return;
      const tempArray = this.state.path.slice(0, this.state.path.length - 1);
      const tempPathString = this.state.pathString.slice(0, this.state.pathString.length - 1);
      this.setState({
        path: tempArray,
        pathString: tempPathString,
        search: false,
        home: true,
        hot: false,
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
      const IntranetDumbRef = (
        <IntranetDumb tree={this.state.tree}
          location={this.state.path[this.state.path.length - 1]}
          goForward={this.goForward}
          path={this.state.path}
          pathString={this.state.pathString}
          goBack={this.goBack}
          timeStamp={this.state.timeStamp}
          searchResult={this.state.searchResult}
          goToStringPath={this.goToStringPath}
          isMobile={this.props.isMobile}
          leftNav={this.props.leftNav}
          showAttachment={this.showAttachment}
          search={this.state.search}
          searching={this.state.searching}
          home={this.state.home}
          hot={this.state.hot}
          handleTabChange={this.handleTabChange}
          user={this.props.user}
          setSearch={this.setSearch}
        />
      );
      return !this.state.tree ? progress : IntranetDumbRef;
    }
}
