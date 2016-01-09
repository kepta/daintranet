import React from 'react';
import Base from '../Base';
import Appbar from './Appbar';
import Folder from './Folder';
import SearchResult from './SearchResult';
import { RefreshIndicator } from 'material-ui';
import Hot from './Hot';
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
          isMobile={this.props.isMobile}
          showAttachment={this.props.showAttachment}
        />
      );
      let whatToshow = folder;
      if (this.props.hot) {
        whatToshow = (
          <Hot
            user={this.props.user}
            goToStringPath={this.props.goToStringPath}
            showAttachment={this.props.showAttachment}
          />
        );
      } else if (this.props.search && this.props.searching) {
        whatToshow = (
          <RefreshIndicator size={40} left={5} top={5} style={{ marginTop: '10px', position: 'relative', alignSelf: 'center' }} status="loading" />
        );
      } else if (this.props.search) {
        whatToshow = (
          <SearchResult
            searchResult={this.props.searchResult}
            goToStringPath={this.props.goToStringPath}
            isMobile={this.props.isMobile}
            showAttachment={this.props.showAttachment}
          />
        );
      }
      return (
        <div style={style.main}>
          <div style={style.appbar}>
            <Appbar
              goBack={this.props.goBack}
              setSearch={this.props.setSearch}
              setSearch={this.props.setSearch}
              leftNav={this.props.leftNav}
              search={this.props.search}
              home={this.props.home}
              hot={this.props.hot}
              handleTabChange={this.props.handleTabChange}
              pathString={this.props.pathString}
              goToStringPath={this.props.goToStringPath}
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
          height: '200px',
        },
      };
    }
}
