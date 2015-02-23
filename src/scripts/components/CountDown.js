'use strict';

import React from 'react';

let style = {
  wrapper: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    left: 0,
  }
};

export default React.createClass({
  displayName: 'CountDown',
  getInitialState() {
    return {
      updateTimerId: null,
      remainSeconds: 10,
    };
  },
  updateRemainSeconds() {
    if (this.state.remainSeconds == 1) {
      // ハンドラを呼ぶ
      this.setState({remainSeconds: 10})
    } else {
      this.setState({remainSeconds: this.state.remainSeconds-1})
    }
  },
  componentDidMount() {
    let that = this;
    let timerId = setInterval(() => {
      that.updateRemainSeconds();
    }, 1000);
    this.setState({updateTimerId: timerId});
  },
  componentWillUnmount() {
    clearInterval(this.state.updateTimerId);
  },
  render() {
    return (
      <p style={style.wrapper}>
        {this.state.remainSeconds}
      </p>
    );
  }
});
