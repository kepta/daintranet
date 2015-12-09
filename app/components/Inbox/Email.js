import React from 'react';
import DumbEmail from './Email.dumb';
import DB from '../../localdb/indexdb';
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
    const dumbEmail = <DumbEmail email={this.state.email}/>;
    return this.state.email ? dumbEmail: null;
  }
}
