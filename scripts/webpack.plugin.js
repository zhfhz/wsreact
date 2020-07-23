const webpackProd = require('./webpack.prod');

const config = Object.assign({}, webpackProd, {
  output: {
    ...webpackProd.output,
    publicPath: `./plugins/demo/`,
    library: 'demo',
  },
});

config.module.rules.forEach((rule) => {
  if (rule.test.toString() === '/\\.(less|css)/') {
    rule.use.find((item) => {
      if (item.loader === 'style-loader') {
        item.options = item.options || {};
        item.options.attributes = { 'data-project': 'demo' };
      }
    });
  }
});

module.exports = config;
