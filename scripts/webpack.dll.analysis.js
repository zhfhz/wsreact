const webpackDll = require('./webpack.dll');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  ...webpackDll,
  plugins: [...webpackDll.plugins, new BundleAnalyzerPlugin()],
};
