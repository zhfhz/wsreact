const webpackDll = require('./webpack.dll');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const prodConfig = {};

module.exports = Object.assign({}, webpackDll, {
  ...prodConfig,
  plugins: [...webpackDll.plugins, new BundleAnalyzerPlugin()],
});
