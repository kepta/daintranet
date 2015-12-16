import React from 'react';
import InboxDumb from './Inbox.dumb';
import Base from '../Base';
import { getInbox } from '../../network/Fetch';
import db from '../../localdb/indexdb';
import { CircularProgress } from 'material-ui';

const LASTEMAILS = 6;

export default class Inbox extends Base {
    constructor(props) {
      super(props);
      this.state = {
        inbox: null,
      };
    }
    extractId(emailList, start, end) {
      let iterator = start > 0 ? start : 0;
      const array = [];
      for (iterator = start > 0 ? start : 0; iterator < end; iterator++) {
        array.push(emailList[iterator].id);
      }
      return array;
    }
    componentDidMount() {
      // console.log(this.props.user);
      console.log('did mount');
      this.props.dbPromise.then(() => {
        getInbox(this.props.user).then((res, rej) => {
          console.log(res);
          const ids = this.extractId(res, res.length - LASTEMAILS, res.length);
          Promise.race(db.getAll(ids, this.props.user)).then(mails => {
            console.log('hwe', mails);
            this.setState({
              inbox: res,
            });
            // this.props.actionLoggedIn();
          }, errPromise => {
            // should logout user
            console.log(errPromise);
          });
        }, err => {
          if (err.response === 401) {
            this.props.setLoginError();
          } else {
            console.log(err);
          }
        });
      });
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.inbox === null) {
        console.log('ehere');
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
      console.log('rendering');
      const progress = (
          <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div style={{ alignSelf: 'center' }}>
              <CircularProgress/>
            </div>
          </div>
      );
      return this.state.inbox ?
            <InboxDumb inbox={this.state.inbox} showEmail={this.props.showEmail}/>
            : progress;
    }
}
