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
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
};
module.exports = Object.assign({}, webpackBase, devConfig);
