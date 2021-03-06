const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = (dir) => path.join(__dirname, '../', dir);

const mode = 'production';

module.exports = {
  mode,
  devtool: mode === 'development' ? 'source-map' : false,
  entry: {
    vendor: [
      // 'react-app-polyfill/stable',
      // 'react-app-polyfill/ie9',
      // 'babel-polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'dva',
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
  optimization: {
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: mode,
    //   },
    // }),
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
