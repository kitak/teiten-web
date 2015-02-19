window.onload = function () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.translate(735, 0);
  context.scale(-1, 1);
  var localMediaStream = null;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true, audio: false}, function (stream) {
      localMediaStream = stream;
      video.src = window.URL.createObjectURL(localMediaStream);
    }, function (error) {
      console.log(error);
    });
  }

  var capture = function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  };
  setInterval(function () {
    capture();
  }, 1000);
};
