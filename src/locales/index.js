import antdZhCN from 'antd/es/locale/zh_CN';
import antdRU from 'antd/es/locale/ru_RU';
import antdEnUS from 'antd/es/locale/en_US';
import moment from 'moment';

const locales = {
  site: {},
  antd: {},
  moment: {},
};

// --------------------------------------------------------------
// 处理英语
let files = require.context('./', true, /en-US\.json$/);
files
  .keys()
  .map((key) => files(key))
  .forEach((item) => {
    locales.site['en-US'] = {
      ...locales.site['en-US'],
      ...item,
    };
  });
locales.antd['en-US'] = antdEnUS;
locales.moment['en-US'] = () => moment.locale('en-gb');

// --------------------------------------------------------------
// 处理简体中文
files = require.context('./', true, /zh-CN\.json$/);
files
  .keys()
  .map((key) => files(key))
  .forEach((item) => {
    locales.site['zh-CN'] = {
      ...locales.site['zh-CN'],
      ...item,
    };
  });
locales.antd['zh-CN'] = antdZhCN;
locales.moment['zh-CN'] = () => moment.locale('zh-cn');

// --------------------------------------------------------------
// 处理俄语
files = require.context('./', true, /ru\.json$/);
files
  .keys()
  .map((key) => files(key))
  .forEach((item) => {
    locales.site['ru'] = {
      ...locales.site['ru'],
      ...item,
    };
  });
locales.antd['ru'] = antdRU;
locales.moment['ru'] = () => moment.locale('ru');

export const defaultLanguage = 'en-US';

export const languages = [
  {
    name: 'English',
    value: 'en-US',
  },
  {
    name: 'Русский язык',
    value: 'ru',
  },
  {
    name: '简体中文',
    value: 'zh-CN',
  },
];

export default locales;
