const webpackBase = require('./webpack.base');
const path = require('path');

const devConfig = {
  ...webpackBase,
  devtool: 'source-map',
  mode: 'development',
  optimization: {
    ...webpackBase.optimization,
    minimize: false,
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://web.zillinx.com:18080',
    },
    port: 9000,
    hot: true,
  },
};
module.exports = devConfig;
