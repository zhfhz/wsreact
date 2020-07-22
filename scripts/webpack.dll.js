const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = (dir) => path.join(__dirname, '../', dir);

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react-app-polyfill/stable',
      'react-app-polyfill/ie9',
      'react',
      'react-dom',
      'react-router-dom',
      'dva',
      // 'moment',
      // 'moment/locale/en-gb',
      // 'moment/locale/zh-cn',
      // 'moment/locale/zh-tw',
    ],
  },
  output: {
    path: resolve('src/assets/js/dll'),
    library: '_dll_[name]',
    filename: '_dll_[name].js',
  },
  resolve: {
    alias: {
      'regenerator-runtime': path.resolve(
        __dirname,
        '../node_modules/regenerator-runtime'
      ),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.join(
        __dirname,
        '../src/assets/js/dll',
        '[name].manifest.json'
      ),
    }),
  ],
};
