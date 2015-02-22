'use strict';

import React from 'react';

let style = {
  video: {
    display: "none"
  }
};

export default React.createClass({
  displayName: 'App',
  getInitialState() {
    return {
      captureTimerId: null,
      canvasContext: null,
      video: null
    };
  },
  capture(canvas, context, video) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  },
  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
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
  componentWillUnmount() {
    clearInterval(this.state.captureTimerId);
  },
  render() {
    return (
      <div>
        <video id="video" autoPlay muted style={style.video} width="740" height="500"></video>
        <canvas id="canvas" width="740" height="500"></canvas>
      </div>
    );
  }
});
