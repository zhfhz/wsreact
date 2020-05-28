import React from 'react';
import intl from 'react-intl-universal';
import { ConfigProvider } from 'antd';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import Router from '@router';
import app from '@/dva';
import locales from "@locales";

const SUPPOER_LOCALES = [
    {
        name: "English",
        value: "en-US"
    },
    {
        name: "繁體中文",
        value: "zh-TW"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    }
]

class App extends React.Component {
    state = {
        currentLocale: '',
    }
    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        // 站点国际化
        let currentLocale = intl.determineLocale({
            urlLocaleKey: "lang",
            cookieLocaleKey: "lang",
        });
        if (!currentLocale) {
            currentLocale = SUPPOER_LOCALES[0].value;
        }
        intl.init({
            currentLocale,
            locales: locales.site,
        });
        // moment国际化
        locales.moment[currentLocale]();
        this.setState({
            currentLocale
        });
    }

    onSelectLocale(e) {
        let lang = e.target.value;
        location.search = `?lang=${lang}`;
    }

    render() {
        const { props, state: { currentLocale } } = this;
        return (
            <ConfigProvider locale={locales.antd[currentLocale]}>
                <select onChange={this.onSelectLocale} defaultValue={currentLocale}>
                    <option value="" disabled>Change Language</option>
                    {
                        SUPPOER_LOCALES.map(locale => (
                            <option key={locale.value} value={locale.value}>{locale.name}</option>
                        ))
                    }
                </select>
                <Router { ...props }/>
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