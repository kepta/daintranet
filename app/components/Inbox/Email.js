import React from 'react';
import DumbEmail from './Email.dumb';
import DB from '../../localdb/indexdb';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
export default class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }
  componentDidMount() {
    DB.get(this.props.id, this.props.user).then((email) => {
      console.log(email);
      this.setState({ email });
    });
  }
  componentWillReceiveProps(nextProps) {
    DB.get(nextProps.id, this.props.user).then((email) => {
      this.setState({ email });
    });
  }
  render() {
    const dumbEmail = (
      <ReactCSSTransitionGroup transitionName="mainwrapper" transitionAppear={true} transitionAppearTimeout={500}>
       <DumbEmail email={this.state.email} hide={this.props.hide} key={1}/>
     </ReactCSSTransitionGroup>
     );
    return this.state.email ? dumbEmail: null;
  }
}
