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
});

module.exports = [
    Object.assign({}, config, {
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([ // 复制插件
                { from: path.join(__dirname,'../src/plugins'), to:  path.join(__dirname,'../dist/plugins') }
            ]),
            ...config.plugins,
        ],
    })
];
