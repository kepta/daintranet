import React from 'react';
import Base from '../Base';
import Appbar from './Appbar';
import Folder from './Folder';
import SearchResult from './Search';
import Hot from './Hot';
export default class Inbox extends Base {
    constructor(props) {
      super(props);
    }
    render() {
      console.log(this.props.user);
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
          isMobile={this.props.isMobile}
          showAttachment={this.props.showAttachment}
        />
      );
      const searchResult = (
        <SearchResult
          searchResult={this.props.searchResult}
          searching={this.props.searching}
          goToSearch={this.props.goToSearch}
          isMobile={this.props.isMobile}
          showAttachment={this.props.showAttachment}
        />
      );
      let whatToshow = folder;
      if (this.props.hot) {
        whatToshow = (
          <Hot
            user={this.props.user}
            goToSearch={this.props.goToSearch}
            showAttachment={this.props.showAttachment}
          />
        );
      } else if (this.props.search) {
        whatToshow = searchResult;
      } else {
        whatToshow = folder;
      }
      return (
        <div style={style.main}>
          <div style={style.appbar}>
            <Appbar
              goBack={this.props.goBack}
              setSearch={this.props.setSearch}
              leftNav={this.props.leftNav}
              search={this.props.search}
              home={this.props.home}
              hot={this.props.hot}
              handleClick={this.props.handleClick}
            />
          </div>
          { whatToshow }
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
        appbar: {
          height: '142x',
        },
      };
    }
}
