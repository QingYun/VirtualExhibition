var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/main.js'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders:[
      { test: /\.scss$/, include: path.resolve(__dirname, 'app'), loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'] },
      { test: /\.(jpg|png)$/, loader: 'url-loader' },
      { test: /\.js$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /data\.json$/, loader: path.join(__dirname, './data-loader.js') },
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/main.css', to: 'main.css' }
    ]),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ]
};
