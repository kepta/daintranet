import React from 'react';
import { LinearProgress } from 'material-ui';

export default class LoadingDumb extends React.Component {
  render() {
    const style = this.style();
    return <LinearProgress style={style} mode="indeterminate"/>;
  }
  style() {
    return {
      position: 'fixed',
      top: '50%'
    }
  }
}
