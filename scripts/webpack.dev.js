const path = require('path');
const webpackBase = require('./webpack.base');
const del = require("del");
const packageConfig = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const devConfig = {
    devtool: 'source-map',
    mode: 'development'
    // mode: 'production'
};
const config = Object.assign({}, webpackBase, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000,
        hot: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    ...devConfig,
    plugins: [
        ...webpackBase.plugins,
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            minRatio: 0.8
        })
    ]
});

// 删除dist
del(['../dist/**']);

module.exports = [
    Object.assign({}, config, {
        entry: {
            cryptojs: 'crypto-js',
        },
        externals: {},
        output: {
            ...webpackBase.output,
        }
    }),
    Object.assign({}, config, {
        entry: {
            react: 'react',
        },
        externals: {},
        output: {
            ...webpackBase.output,
        }
    }),
    Object.assign({}, config, {
        entry: {
            dom: 'react-dom'
        },
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
        externals: {
            'react-dom': 'dom',
            'react': 'react'
        },
        output: {
            ...webpackBase.output,
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
                { from: path.join(__dirname,'../src/plugins'), to:  path.join(__dirname,'../dist/plugins') },
                { from: path.join(__dirname,'../src/assets'), to:  path.join(__dirname,'../dist/assets') }
            ]),
            ...config.plugins,
        ],
    })
];
