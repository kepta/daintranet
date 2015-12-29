import React from 'react';
import Base from '../Base';
import Appbar from './Appbar';
import Folder from './Folder';
import SearchResult from './Search';
export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      const style = this.style();
      const folder = (
        <Folder
          tree={this.props.tree}
          location={this.props.location}
          goForward={this.props.goForward}
          path={this.props.path}
          pathString={this.props.pathString}
          timeStamp={this.props.timeStamp}
          searching={this.props.searching}
        />
      );
      const searchResult = (
        <SearchResult
          searchResult={this.props.searchResult}
          searching={this.props.searching}
          goToSearch={this.props.goToSearch}
        />
      );
      return (
        <div style={style.main}>
          <Appbar
            goBack={this.props.goBack}
            setSearch={this.props.setSearch}
          />
         { !this.props.searchResult ? folder: searchResult}
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
