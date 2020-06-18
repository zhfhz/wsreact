const path = require('path');
const webpackBase = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageConfig = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devConfig = {
    devtool: 'source-map',
    mode: 'development'
    // mode: 'production'
}
const config = Object.assign({}, webpackBase, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: false,
        port: 9000,
        hot: false,
    },
    ...devConfig,
});

module.exports = [
    Object.assign({}, config, {
        entry: {
            react: 'react',
        },
        plugins: [
            new CleanWebpackPlugin(),
            ...webpackBase.plugins,
        ],
        externals: {},
        output: {
            ...webpackBase.output,
            // library: '[name]'
        },

    }),
    Object.assign({}, config, {
        entry: {
            dom: 'react-dom'
        },
        plugins: [
            ...webpackBase.plugins,
        ],
        externals: {
            react: 'react',
        },
        output: {
            ...webpackBase.output,
            // library: '[name]'
        },
    }),
    Object.assign({}, config, {
        entry: {
            moment: ['moment/locale/zh-cn', 'moment/locale/zh-tw', 'moment/locale/en-gb', 'moment'],
            dva: 'dva',
            intl: 'react-intl-universal',

        },
        plugins: [
            ...webpackBase.plugins,
        ],
        externals: {
            'react-dom': 'dom',
            'react': 'react'
        },
        output: {
            ...webpackBase.output,
            // library: '[name]'
        },
    }),
    Object.assign({}, config, {
        plugins: [
            new HtmlWebpackPlugin({
                namespace: packageConfig.name,
                title: 'react测试',
                template: 'src/index.html',
                favicon: 'src/assets/image/logo.png',
                inject: false,
            }),
            new CopyWebpackPlugin([ // 复制插件
                { from: path.join(__dirname,'../src/plugins'), to:  path.join(__dirname,'../dist/plugins') }
            ]),
            ...config.plugins,
        ],
    })
];
