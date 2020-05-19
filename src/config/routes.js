import React from 'react';
import PluginLoader from '../components/PluginLoader';

// 项目自有的页面路由
const routes = [
  {
    path: '/about',
    type: 'pages',
    component: React.lazy(() => import('../pages/About')),
  }
];

// 公共的页面
const common_routes = [
  {
    path: '',
    type: 'pages',
    component: React.lazy(() => import('../pages/NotFound')),
  }
];

// 服务端配置获取可插拔的子项目,前提是项目代码已经放在此项目的dist/plugins目录下
const PLUGINS = [];

// 根据服务端传入的菜单为插件生成动态路由
export default (menus = []) => {
  const plugins = menus.filter(menu => menu.type === 'plugins');
  return [
    ...plugins.map(plugin => ({
      ...plugin,
      component: PluginLoader(plugin.component),
    })),
    ...routes,
    ...common_routes
  ];
}

