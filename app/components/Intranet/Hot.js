import React from 'react';
import Base from '../Base';
import { Avatar, ListDivider } from 'material-ui';
import { FolderIcon, PdfIcon } from '../Icons';
import { readTopFolders } from '../../network/firebase';
import Loading from '../TroubleLoading';
import ListItem from './ListItem';

// import ListItem from './ListItem';

export default class HotItem extends Base {

    constructor(props) {
      super(props);
      this.state = {
        data: undefined,
      };
      this._bind('goForward', 'showAttachment');
      readTopFolders(props.user).then((obj) => {
        const hot = Object.keys(obj).map((item, key) => {
          return {
            path: item.replace(/\^/g, '.').replace(/\*/g, '/'),
            count: obj[item],
          };
        }).sort((a, b) => {
          return b.count - a.count;
        });
        this.setState({
          data: hot,
        });
      });
    }
    goForward(x, item) {
      this.props.goToStringPath(item);
    }
    showAttachment(x) {
      this.props.showAttachment(x);
    }
    render() {
      // console.log(this.state.data);
      const style = this.style();
      const data = this.state.data ?
        (<ListItem
          items={this.state.data}
          goForward={this.goForward}
          showAttachment={this.showAttachment}
          fromSearch
        />) : <Loading/>;
      return (
        <div style={style.main}>
          {data}
        </div>
      );
    }
    style() {
      return {
        main: {
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        },
      };
    }
}
