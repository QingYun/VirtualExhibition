var path = require('path'),
    fs = require('fs');

module.exports = function(source) {
  var callback = this.async();
  fs.readFile(path.resolve('./data.json'), 'utf-8', function (err, data) {
    if (err) return callback(err);
    callback(null, 'const data = ' + data + '; module.exports = data;');
  });
};
