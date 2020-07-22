/**
 * webpack-dev-server 使用
 */
const path = require('path');
const webpackDev = require('./webpack.dev');
module.exports = Object.assign({}, webpackDev, {
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
});
