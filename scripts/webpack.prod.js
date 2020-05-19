const webpackBase = require('./webpack.base');
const webpack = require('webpack');


const prodConfig = {
    // mode: 'production',
    devtool: 'cheap-module-source-map',
}

module.exports = () => {
    webpack(
        Object.assign(webpackBase[0], {
            ...prodConfig
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
    webpack(
        Object.assign(webpackBase[1], {
            ...prodConfig
        }),
        (err,stats)=>{
            if(err || stats.hasErrors()){
                console.log(stats);
                console.log("构建业务代码出错！");
            }else{
                console.log("构建业务代码成功！");
            }
        }
    );
}