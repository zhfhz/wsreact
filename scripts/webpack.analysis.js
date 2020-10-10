const webpackProd = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  ...webpackProd,
  devServer: {},
  plugins: [...webpackProd.plugins, new BundleAnalyzerPlugin()],
};
