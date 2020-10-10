import React from 'react';
import intl from 'react-intl-universal';
import locales, { defaultLanguage } from '@locales';
import { ConfigProvider, message, Modal } from 'antd';
import { Router } from 'dva/router';
import MyRouter, { saveHistory } from '@router';
import routes from '@routes';
import { connect } from 'dva';

const createHashHistory = require('history').createHashHistory;

const packageConfig = require('../package.json');

message.config({ prefixCls: `${packageConfig.name}-message` });
Modal.config({
  rootPrefixCls: `${packageConfig.name}`,
});

export default
@connect(null, {
  initWebSocket: () => ({
    type: 'global/initWebSocket',
  }),
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocale: '',
    };
    const { initWebSocket } = props;
    initWebSocket();
    const { basename } = props;
    this.history = createHashHistory({ basename });
    saveHistory(this.history);
  }

  componentDidMount() {
    this.loadLocales();
  }

  loadLocales() {
    // 站点国际化
    let currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang',
    });
    if (!locales.site[currentLocale]) {
      currentLocale = defaultLanguage;
      window.location.search = `?lang=${currentLocale}`;
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
      currentLocale,
    });
  }

  render() {
    const {
      state: { currentLocale },
    } = this;
    return (
      <ConfigProvider
        locale={locales.antd[currentLocale]}
        prefixCls={packageConfig.name}
      >
        <Router history={this.history}>
          <MyRouter routes={routes} />
        </Router>
      </ConfigProvider>
    );
  }
}
