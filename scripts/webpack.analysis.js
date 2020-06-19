const webpackProd = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {

};

module.exports =  Object.assign({}, webpackProd[webpackProd.length - 1], {
    ...prodConfig,
    plugins: [
        ...webpackProd[webpackProd.length - 1].plugins,
        new BundleAnalyzerPlugin()
    ],
});