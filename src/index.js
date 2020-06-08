import React from 'react';
import intl from 'react-intl-universal';
import { ConfigProvider } from 'antd';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import Router from '@router';
import app from '@/dva';
import locales from "@locales";
import '@assets/css/common.less';
import packageConfig from '../package.json';
import getRoutes from "@routes/index";
import { HashRouter} from "dva/router";

const routes = getRoutes();

class App extends React.Component {
    state = {
        currentLocale: '',
    }
    constructor() {
        super();
        localStorage.setItem('global_transition_appear', 'true');
    }
    componentDidMount() {
        this.loadLocales();
    }

    loadMenus() {

    }

    loadLocales() {
        // 站点国际化
        let currentLocale = intl.determineLocale({
            urlLocaleKey: "lang",
            cookieLocaleKey: "lang",
        });


        if (!locales.site[currentLocale]) {
            currentLocale = 'zh-CN';
            location.search = `?lang=${currentLocale}`;
            return;
        }
        // moment国际化
        locales.moment[currentLocale]();
        // locales.site 是站点国际化词条
        // locales.antd 是antd 组件国际化词条
        intl.init({
            currentLocale,
            locales: locales.site,
        });
        this.setState({
            currentLocale
        });
    }

    render() {
        const { props: { currentLocale, basename } } = this;
        return (
            <ConfigProvider
                locale={locales.antd[currentLocale]}
                prefixCls={packageConfig.name}
            >
                <HashRouter basename={`${basename}`}>
                    {
                        Router({ routes, basename: '' })
                    }
                </HashRouter>
            </ConfigProvider>
        );
    }
}

export default (id, base = '') => {
    app.router(() => <App basename={base} />);
    if (typeof id === 'string') {
        app.start(document.getElementById(id));
    } else {
        app.start(id);
    }
};