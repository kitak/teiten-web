'use strict';

import React from 'react';

let style = {
  video: {
    display: "none"
  }
};

export default React.createClass({
  displayName: 'App',
  render() {
    return (
      <div>
        <video id="video" autoPlay muted style={style.video} width="740" height="500"></video>
        <canvas id="canvas" width="740" height="500"></canvas>
      </div>
    );
  }
});
