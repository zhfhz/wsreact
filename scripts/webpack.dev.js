const webpackBase = require('./webpack.base');
const path = require('path');

const devConfig = {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    hot: true,
  },
};
module.exports = Object.assign({}, webpackBase, devConfig);
