import app from '@/dva';
import {dynamicWrapper} from '@utils/obj';
import PluginLoader from "@components/PluginLoader";

/** 此处配置注册页面所有路由，静态菜单在src/config/routes.config.js中定义，或者可以从服务器获取 **/
export default [
    {
        path: '/agreement',
        exact: true,
        component: dynamicWrapper(app, [], import('@pages/Agreement'))
    },
    {
        path: '/sign',
        exact: false,
        component: dynamicWrapper(app, [], import('@layouts/BlankLayout')),
        pages: [
            {
                path: '/in',
                component: dynamicWrapper(app, [import('@pages/SignIn/model')], import('@pages/SignIn')),
                exact: true,
            },
            {
                path: '/up',
                component: dynamicWrapper(app, [import('@pages/SignUp/model')], import('@pages/SignUp')),
                exact: true,
            },
            {
                path: '/',
                redirect: '/sign/up',
            }
        ]
    },
    {
        path: '/app',
        component: dynamicWrapper(app, [], import('@layouts/BaseLayout')),
        exact: false,
        pages: [
          {
            path: '/about',
            component: dynamicWrapper(app, [import('@pages/About/model')], import('@pages/About')),
            exact: true,
          },
          {
            path: '/demo',
            component: dynamicWrapper(app, [import('@pages/PingUseRate/model')], import('@pages/PingUseRate')),
            exact: true,
          },
          {
            path: '/mount/:module',
            component: PluginLoader,
            exact: false,
          },
          {
            path: '/',
            redirect: '/app/about',
          }
        ]
    },
    {
        path: '/',
        redirect: '/app/demo',
    }
];