import React from 'react';
export default class Loading extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    // this.props.action();
    setTimeout(this.props.actions, 3000);
  }
  render () {
    return (
      <div>
        Hold on loading
      </div>
    );
  }
}
