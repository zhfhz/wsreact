
let webpackDev = require('./webpack.dev');
let webpackProd = require('./webpack.prod') ;

let argv = process.argv;
let params = argv.slice(2);
console.log(params);
let webpackConf = params.indexOf('--mode=production') > -1 ? webpackProd : webpackDev;
webpackConf();