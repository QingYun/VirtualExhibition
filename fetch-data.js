var path = require('path'),
    fs = require('fs');

var cached_data = null;

module.exports = function (callback) {
  if (cached_data !== null) {
    return callback(null, cached_data);
  }

  fs.readFile(path.resolve('./data.json'), 'utf-8', function (err, data) {
    if (err) return callback(err);
    cached_data = data;
    callback(null, data);
  });
}
