const webpackBase = require('./webpack.base');
const path = require('path');

const prodConfig = {
  ...webpackBase,
  mode: 'production',
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://web.zillinx.com:8080',
    },
    port: 80,
    hot: true,
  },
};

module.exports = prodConfig;
