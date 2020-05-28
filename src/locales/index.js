import antdZhCN from 'antd/es/locale/zh_CN';
import antdZhTW from 'antd/es/locale/zh_TW';
import antdEnUS from 'antd/es/locale/en_US';
import moment from 'moment';

const locales = {
    site: {},
    antd: {},
    moment: {}
};

// --------------------------------------------------------------
// 处理英语
let files = require.context('./', true, /en-US\.json$/);
files
    .keys()
    .map(key => files(key))
    .forEach(item => {
        locales.site['en-US'] = {
            ...locales.site['en-US'],
            ...item
        };
    });
locales.antd['en-US'] = antdEnUS;
locales.moment['en-US'] = () => moment.locale('en-gb');


// --------------------------------------------------------------
// 处理简体中文
files = require.context('./', true, /zh-CN\.json$/);
files
    .keys()
    .map(key => files(key))
    .forEach(item => {
        locales.site['zh-CN'] = {
            ...locales.site['zh-CN'],
            ...item
        };
    });
locales.antd['zh-CN'] = antdZhCN;
locales.moment['zh-CN'] = () => moment.locale('zh-cn');


// --------------------------------------------------------------
// 处理繁体中文
files = require.context('./', true, /zh-TW\.json$/);
files
    .keys()
    .map(key => files(key))
    .forEach(item => {
        locales.site['zh-TW'] = {
            ...locales.site['zh-TW'],
            ...item
        };
    });
locales.antd['zh-TW'] = antdZhTW;
locales.moment['zh-TW'] = () => moment.locale('zh-tw');

export default locales;