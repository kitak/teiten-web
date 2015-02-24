var fs = require('fs');

module.exports = {
  saveFromDataURL: function (dataURL) {
    var snapData = dataURL.replace(/^data\:image\/png;base64,/, '');
    var buffer = new Buffer(snapData, 'base64');
    fs.writeFile('/Users/usr0600298/Desktop/teiten-web/sample.png', buffer);
  }
};
