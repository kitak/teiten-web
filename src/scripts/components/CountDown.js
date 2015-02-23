'use strict';

import React from 'react';

let style = {
  wrapper: {
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: "64px",
    marginRight: "20px",
    marginBottom: "220px"
  }
};

export default React.createClass({
  displayName: 'CountDown',
  propTypes: {
    onExpire: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      updateTimerId: null,
      remainSeconds: 10,
    };
  },
  updateRemainSeconds() {
    if (this.state.remainSeconds == 1) {
      this.props.onExpire();
      this.setState({remainSeconds: 10});
    } else {
      this.setState({remainSeconds: this.state.remainSeconds-1});
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
