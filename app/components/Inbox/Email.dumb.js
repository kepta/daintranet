import React from 'react';

export default class DumbEmail extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props.email)}</div>;
  }
}
