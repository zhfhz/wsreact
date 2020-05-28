const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageConfig = require('../package.json');
// const uglifyjs = require('uglifyjs-webpack-plugin');

const distDirStr = path.resolve(__dirname, '../dist/');

const webpackTask = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
    },
    output: {
        filename: '[name].js',
        // library: "[name]",
        libraryTarget: 'amd',
        path: distDirStr,
        chunkFilename: '[id].[hash].chunk.js',
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
            "@components": path.resolve(__dirname, "../src/components"),
            "@pages": path.resolve(__dirname,"../src/pages"),
            "@router": path.resolve(__dirname,"../src/router"),
            "@routes": path.resolve(__dirname,"../src/routes"),
            "@utils": path.resolve(__dirname,"../src/utils"),
            "@layouts": path.resolve(__dirname,"../src/layouts"),
            "@assets": path.resolve(__dirname,"../src/assets"),
            "@locales": path.resolve(__dirname,"../src/locales"),
        }
    },
    externals: {
        'moment': 'moment',
        'dva': 'dva',
        'react-intl-universal': 'intl',
        'react': 'react',
        'react-dom': 'dom'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /\.json$/],
            },
            {
                test: /\.less$/,
                use: [
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            namespace: packageConfig.name,
            title: 'react测试',
            template: 'src/index.html',
            inject: false,
        }),
        // new uglifyjs(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 9000,
        hot: true,
    }
};

module.exports = webpackTask;