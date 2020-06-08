import app from '@/dva';
import { dynamicWrapper } from '@utils';
import PluginLoader from "@components/PluginLoader";

/** 此处配置注册页面所有路由，静态菜单在src/config/routes.config.js中定义，或者可以从服务器获取 **/
export default [
  {
    path: '/app',
    component: dynamicWrapper(app, [], import('@layouts/BaseLayout')),
    pages: [
      {
        path: 'about',
        component: dynamicWrapper(app, [import('@pages/About/model')], import('@pages/About')),
      },
      {
        path: 'demo',
        component: dynamicWrapper(app, [import('@pages/PingUseRate/model')], import('@pages/PingUseRate')),
      },
      {
        path: 'mount/:module',
        component: PluginLoader(),
      },
      {
        path: '',
        component: dynamicWrapper(app, [], import('@pages/NotFound')),
      }
    ]
  },
];