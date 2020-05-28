const webpackBase = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devConfig = {
    devtool: 'source-map',
    mode: 'development'
}
const config = Object.assign({}, webpackBase, {
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
    config
];
