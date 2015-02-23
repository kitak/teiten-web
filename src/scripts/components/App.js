'use strict';

import React from 'react';
import CountDown from './CountDown';

let style = {
  video: {
    WebkitTransform: "scaleX(-1)",
    position: "fixed",
    right: 0,
    bottom: 0,
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
  },
  canvas: {
    opacity: 0,
  },
  currentCapture: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  snapButton: {
    position: "absolute",
    left: 15,
    bottom: 30,
    fontSize: 18,
  },
};

export default React.createClass({
  displayName: 'App',
  getInitialState() {
    return {
      captureTimerId: null,
    };
  },
  capture(canvas, context, video) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  },
  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    let video = this.refs.video.getDOMNode();
    let canvas = this.refs.canvas.getDOMNode();
    let context = canvas.getContext('2d');
    // ビデオの映像を左右反転させる
    context.translate(735, 0);
    context.scale(-1, 1);

    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true, audio: false}, function (stream) {
        video.src = window.URL.createObjectURL(stream);
      }, function (error) {
        console.log(error);
      });
    }
    let that = this;

    this.state.captureTimerId = setInterval(() => {
      that.capture(canvas, context, video);
    }, 100);
  },
  _onExpire() {
    this.setState({currentCapture: this.refs.canvas.getDOMNode().toDataURL('image/png')});
  },
  _onSnap() {
    this.setState({currentCapture: this.refs.canvas.getDOMNode().toDataURL('image/png')});
  },
  componentWillUnmount() {
    clearInterval(this.state.captureTimerId);
  },
  render() {
    return (
      <div>
        <video ref="video" autoPlay muted style={style.video} width="740" height="500"></video>
        <canvas ref="canvas" width="740" height="500" style={style.canvas}></canvas>
        <img src={this.state.currentCapture} width="120" height="85" style={style.currentCapture} />
        <button onClick={this._onSnap} style={style.snapButton}>撮</button>
        <CountDown onExpire={this._onExpire} />
      </div>
    );
  }
});
