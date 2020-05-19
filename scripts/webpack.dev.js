const webpack = require('webpack');
const webpackBase = require('./webpack.base');


const devConfig = {
    devtool: 'source-map',
}

module.exports = () => {
    webpack(
        Object.assign(webpackBase[0], {
            ...devConfig
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
            ...devConfig
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
