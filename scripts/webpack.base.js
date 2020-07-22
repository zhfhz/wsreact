const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@common': path.resolve(__dirname, '../src/common'),
      '@router': path.resolve(__dirname, '../src/router'),
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@locales': path.resolve(__dirname, '../src/locales'),
      '@services': path.resolve(__dirname, '../src/services'),
      'bn.js': path.resolve(__dirname, '../node_modules/bn.js'),
      'readable-stream': path.resolve(
        __dirname,
        '../node_modules/readable-stream'
      ),
    },
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/\.json$/],
        include: [/src/, /node_modules/],
      },
      {
        test: /\.(less|css)/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[path][name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                // require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
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
            },
          },
        ],
      },
      {
        test: /\.(less|css)/,
        include: [/node_modules/],
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                // require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
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
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 5000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      namespace: packageConfig.name,
      title: 'react测试',
      template: 'src/index.html',
      favicon: 'src/assets/image/logo.png',
      inject: false,
    }),
    new CopyWebpackPlugin([
      // 复制插件
      {
        from: path.join(__dirname, '../src/plugins'),
        to: path.join(__dirname, '../dist/plugins'),
      },
      {
        from: path.join(__dirname, '../src/assets'),
        to: path.join(__dirname, '../dist/assets'),
      },
    ]),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      minRatio: 0.8,
    }),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllReferencePlugin({
      manifest: require('../src/assets/js/dll/vendor.manifest'),
    }),
  ],
};

module.exports = webpackTask;
