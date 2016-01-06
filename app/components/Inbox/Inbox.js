import React from 'react';
import InboxDumb from './Inbox.dumb';
import Base from '../Base';
import TroubleLoading from '../TroubleLoading';
import { getInbox } from '../../network/Fetch';
import db from '../../localdb/indexdb';
import { CircularProgress } from 'material-ui';

const LASTEMAILS = 4;

export default class Inbox extends Base {
    constructor(props) {
      super(props);
      this.state = {
        inbox: null,
      };
      this._bind('fetchInbox');
    }
    extractId(emailList, start, end) {
      let iterator = start > 0 ? start : 0;
      const array = [];
      for (iterator = start > 0 ? start : 0; iterator < end; iterator++) {
        array.push(emailList[iterator].id);
      }
      return array;
    }
    fetchInbox() {
      console.log('fetching');
      this.props.dbPromise.then(() => {
        getInbox(this.props.user).then((res, rej) => {
          const ids = this.extractId(res, res.length - LASTEMAILS, res.length);
          Promise.race(db.getAll(ids, this.props.user)).then(mails => {
            this.setState({
              inbox: res,
            });
            // this.props.actionLoggedIn();
          }, errPromise => {
            // should logout user
            console.error(errPromise);
          });
        }, err => {
          console.error(err.message || err.code);
        });
      });
    }
    componentDidMount() {
      this.fetchInbox();
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.inbox === null) {
        // console.error('ehere');
        return true;
      }
      return false;
    }
    //   // this code can be buggy
    //   // as we need to absolutely check if nextprops are different
    //   // can use require('react-addons-shallow-compare');
    //   const nextLen = nextProps.inbox.length - 1;
    //   const len = this.props.inbox.length - 1;
    //   if (nextProps.inbox[nextLen] === this.props.inbox[len]) {
    //     return false;
    //   }
    //   return true;
    // }
    render() {
      return this.state.inbox ?
            <InboxDumb inbox={this.state.inbox} showEmail={this.props.showEmail}/>
            : <TroubleLoading callback={this.fetchInbox}/>;
    }
}
