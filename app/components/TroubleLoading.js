import React from 'react';
import Base from './Base';
import { CircularProgress } from 'material-ui';

export default class TroubleLoading extends Base {
  constructor(props) {
    super(props);
    this.state = {
      count: -1,
    };
    this._bind('tryAgain');
  }
  tryAgain() {
    setTimeout(() => {
      this.setState({
        count: 2,
      });
    }, 7000);
    this.setState({
      count: -1,
    });
    this.props.callback();
  }
  resetAll() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    // setTimeout(() => {
    //   if (this) {
    //     this.setState({
    //       count: this.state.count + 1,
    //     });
    //   }
    // }, 7000);
    // console.log(this.state.count);
    const showTryAgain = (
        <p onClick={this.tryAgain}>Try again</p>
    );
    const resetALL = (
        <p onClick={this.resetAll}>Oh oh!,Click here to reload</p>
    );
    return (
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <div style={{ alignSelf: 'center' }}>
          <CircularProgress/>
          <div style={{ marginTop: '25px' }}>
            {this.state.count === 0 ? showTryAgain : null}
            {this.state.count === 2 ? resetALL : null}
          </div>
        </div>
      </div>
    );
  }
}
