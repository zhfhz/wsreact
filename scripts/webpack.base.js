const path = require('path');
const webpack = require('webpack');
const packageConfig = require('../package.json');
const themeConfig = require('../theme.json');

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
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/\.json$/, /node_modules/],
            },
            {
                test: /\.(less|css)/,
                exclude: [/node_modules/],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) =>  [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-preset-env')(),
                                // require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    ...themeConfig,
                                    'ant-prefix': `${packageConfig.name}`,
                                },
                                javascriptEnabled: true,
                            },
                        }
                    },
                ]
            },
            {
                test: /\.(less|css)/,
                include: [/node_modules/],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            plugins: (loader) =>  [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-preset-env')(),
                                // require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false,
                            lessOptions: {
                                modifyVars: {
                                    ...themeConfig,
                                    'ant-prefix': `${packageConfig.name}`,
                                },
                                javascriptEnabled: true,
                            },
                        }
                    },
                ]
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
        // new uglifyjs(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};

module.exports = webpackTask;