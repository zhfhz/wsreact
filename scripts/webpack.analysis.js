const webpackProd = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {

}

module.exports =  Object.assign({}, webpackProd[3], {
    ...prodConfig,
    plugins: [
        ...webpackProd[3].plugins,
        new BundleAnalyzerPlugin()
    ],
});