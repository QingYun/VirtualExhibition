var fetchData = require('./fetch-data');

module.exports = function(source) {
  var callback = this.async();
  fetchData(function (err, data) {
    if (err) return callback(err);
    callback(null, 'const data = ' + data + '; module.exports = data;');
  });
};
