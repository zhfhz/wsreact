const webpackProd = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const prodConfig = {
  devServer: {},
};

module.exports = Object.assign({}, webpackProd, {
  ...prodConfig,
  plugins: [...webpackProd.plugins, new BundleAnalyzerPlugin()],
});
