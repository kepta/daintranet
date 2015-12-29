import React from 'react';
import DumbEmail from './Email.dumb';
import DB from '../../localdb/indexdb';
import { CircularProgress } from 'material-ui';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }
  componentDidMount() {
    DB.get(this.props.id, this.props.user).then((email) => {
      this.setState({ email });
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ email: null });
    DB.get(nextProps.id, this.props.user).then((email) => {
      this.setState({ email });
    });
  }
  render() {
    const dumbEmail = (
       <ReactCSSTransitionGroup transitionName="mainwrapper" transitionAppear
         transitionEnterTimeout={500} transitionLeaveTimeout={300}
       >
        <DumbEmail
          email={this.state.email}
          hide={this.props.hide} key={1}
          setStar={this.props.setStar}
          starred={this.props.starred}
        />
      </ReactCSSTransitionGroup>
    );
    const progress = (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <div style={{ alignSelf: 'center' }}>
            <CircularProgress/>
          </div>
        </div>
    );
    return this.state.email !== null ? dumbEmail: progress;
  }
}

// import React from 'react';
// import DumbEmail from './Email.dumb';
// import DB from '../../../localdb/indexdb';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//
// import { CircularProgress } from 'material-ui';
// export default class Email extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: null,
//       loading: true,
//     };
//   }
//   componentDidMount() {
//     DB.get(this.props.id, this.props.user).then((email) => {
//       console.log(email);
//       this.setState({ email, loading: false });
//       this.id = this.props.id;
//     });
//   }
//   componentWillReceiveProps(nextProps) {
//     this.setState({ loading: true });
//     DB.get(nextProps.id, this.props.user).then((email) => {
//       this.setState({ email, loading: false });
//       this.id = nextProps.id;
//     });
//   }
//   shouldComponentUpdate(nextProp) {
//     console.log('here');
//     if (this.id === nextProp.id) {
//       return false;
//     }
//     return true;
//   }
//   render() {

//     return !this.state.loading ? dumbEmail: progress;
//   }
// }
