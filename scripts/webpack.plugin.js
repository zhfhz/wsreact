const path = require('path');
const webpackBase = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageConfig = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
}
const config = Object.assign({}, webpackBase, {
    devServer: {
        hot: false,
    },
    output: {
        ...webpackBase.output,
        publicPath: `./plugins/${packageConfig.name}/`,
        library: `${packageConfig.name}`,
    },
    ...devConfig,
    plugins: [
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        ...webpackBase.plugins
    ]
});

config.module.rules.forEach(rule => {
    if (rule.test.toString() === '/\\.(less|css)/') {
        rule.use.find(item => {
            if (item.loader === 'style-loader') {
                item.options = item.options || {};
                item.options.attributes = { 'data-project': packageConfig.name };
            }
        })
    }
});

module.exports = Object.assign({}, config, {
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([ // 复制插件
            { from: path.join(__dirname,'../src/plugins'), to:  path.join(__dirname,'../dist/plugins') }
        ]),
        ...config.plugins,
    ],
})
