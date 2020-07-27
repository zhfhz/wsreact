const webpackDev = require('./webpack.dev');
const path = require('path');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 80,
    hot: true,
  },
};

module.exports = Object.assign({}, webpackDev, prodConfig);
