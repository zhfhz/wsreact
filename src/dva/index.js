import dva from 'dva';
import createLoading from 'dva-loading/dist';

const app = dva({});
// 加载loading插件
app.use(createLoading({}));

// 遍历global Model
let files = require.context('../models', true, /\.js$/);
files
    .keys()
    .map(key => files(key))
    .forEach(module => app.model(module.default));


// files = require.context('../pages', true, /model\.js$/);
// files
//     .keys()
//     .map(key => files(key))
//     .forEach(module => app.model(module.default));

export  default  app;