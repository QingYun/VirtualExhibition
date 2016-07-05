var fetchData = require('./fetch-data'),
    os = require('os');

module.exports = function(source) {
  var callback = this.async();
  fetchData(function (err, data) {
    if (err) return callback(err);

    var slide_length_list = JSON.parse(data)
      .map(function (scene) { return scene.widgets.map(function (w) { return w.action; })
      })
      .reduce(function (acc, actions) {
        return acc.concat(actions);
      }, [])
      .filter(function (action) {
        return action.name === 'show-slider';
      })
      .map(function (slider) {
        return slider.payload.slides.length;
      });
    var max_slides = Math.max.apply(Math, slide_length_list);

    callback(null, '$max-slides: ' + max_slides + ';' + os.EOL + source);
  });
};
