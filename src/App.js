import React from 'react';
import intl from 'react-intl-universal';
import locales from '@locales';
import { ConfigProvider } from 'antd';
import { Router } from 'dva/router';
import MyRouter, { history } from '@router';
import routes from '@routes';
import { connect } from 'dva';

const packageConfig = require('../package.json');

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
      currentLocale = 'zh-CN';
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
      props: { basename },
      state: { currentLocale },
    } = this;
    return (
      <ConfigProvider
        locale={locales.antd[currentLocale]}
        prefixCls={packageConfig.name}
      >
        <Router history={history} basename={`${basename}`}>
          <MyRouter routes={routes} />
        </Router>
      </ConfigProvider>
    );
  }
}
