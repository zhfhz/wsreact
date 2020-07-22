const webpackBase = require('./webpack.base');

const devConfig = {
  devtool: 'source-map',
  mode: 'development',
  // mode: 'production'
};
module.exports = Object.assign({}, webpackBase, devConfig);
