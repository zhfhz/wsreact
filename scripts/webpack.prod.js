const webpackDev = require('./webpack.dev');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
};

module.exports = Object.assign({}, webpackDev, prodConfig);
