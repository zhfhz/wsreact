const fs = require('fs');
const path = require('path');
// const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), {encoding: 'utf-8'}));

// 清理dist
const distDirStr = path.resolve(__dirname, '../dist/');
if (fs.existsSync(distDirStr)) {
    console.log('清理'+ distDirStr + '...');
    fs.readdirSync(distDirStr).map(function(filename) {
        const fileAbsolutePath = path.join(distDirStr, filename);
        if (fs.statSync(fileAbsolutePath).isDirectory()) {
            fs.rmdirSync(fileAbsolutePath, { recursive: true });        
        } else {
            fs.unlinkSync(fileAbsolutePath);
        }
    });
    console.log('清理' + distDirStr +  '...完成。');
}
 
const webpackTask = [
    {
        entry: {
            ['react-dom']: 'react-dom',
            react: 'react',
            ['react-router-dom']: 'react-router-dom',
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'amd',
            library: '[name]',
            path: path.resolve(__dirname, '../src/assets/libs'),
        },
        resolve: {
            extensions: [".js", ".jsx"],
            alias: {

            }
        },
        module: {
            rules: [
                {
                    test: /\.js|jsx$/,
                    loader: 'babel-loader',
                    exclude: [/node_modules/, /\.json$/],
                }
            ],
        },
        plugins: [
            new CopyPlugin([
                {
                    from: 'node_modules/requirejs/require.js',
                },
            ]),
        ],
    },
    {
        entry: {
            [package.name]: path.resolve(__dirname, '../src/index.js'),
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'amd',
            library: '[name]',
            path: distDirStr,
            chunkFilename: '[id].[hash].chunk.js',
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        externals: {
            'react-dom': 'react-dom',
            'react': 'react',
            'react-router-dom': 'react-router-dom',
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
                namespace: package.name,
                title: 'react测试',
                template: 'src/index.html',
                inject: false,
            }),
            new CopyPlugin([
                {
                    from: 'src/assets',
                    to: 'assets'
                },
                {
                    from: 'src/plugins',
                    to: 'plugins'
                }
            ]),
        ],
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: false,
            port: 9000,
            hot: true,
        }
    }
];

module.exports = webpackTask;