/**
 * webpack-dev-server 使用
 */
const webpackBase = require('./webpack.base');
const webpack = require('webpack');

webpack(
  Object.assign(webpackBase[0], {
    devtool: 'source-map',
  }),
  (err,stats)=>{
      if(err || stats.hasErrors()){
          console.log(stats);
          console.log("构建依赖包出错！");
      }else{
          console.log("构建依赖包成功！");
      }
  }
);
module.exports = {
  ...webpackBase[1],
  devtool: 'source-map',
  externals: {}
}