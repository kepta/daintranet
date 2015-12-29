import React from 'react';
import Base from './Base';
import { LinearProgress } from 'material-ui';

export default class LoadingDumb extends Base {
  render() {
    const style = this.style();
    return <LinearProgress style={style} mode="indeterminate"/>;
  }
  style() {
    return {
      position: 'fixed',
      top: '50%',
    };
  }
}
