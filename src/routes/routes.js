import app from '@/dva';
import PluginLoader from '@components/PluginLoader';
import dynamic from 'dva/dynamic';
import { Spin } from 'antd';
import React from 'react';

dynamic.setDefaultLoadingComponent(() => (
  <Spin indicator={<div>Loading...</div>} />
));

const LayoutImport = (layoutName) => {
  return dynamic({
    app,
    models: () => [],
    component: () => import(`@layouts/${layoutName}/index`),
  });
};

/**
 *
 * @param pageName
 * @param modelDir 默认pageName为目录，model为目录下的model
 * @constructor
 */
const PageImport = (pageName) => {
  return dynamic({
    app,
    models: () => [import(`@pages/${pageName}/model.js`)],
    component: () => import(`@pages/${pageName}/index`),
  });
};

/** 此处配置注册页面所有路由，静态菜单在src/config/routes.config.js中定义，或者可以从服务器获取 * */
export default [
  /**
   * 用户协议
   */
  {
    path: '/agreement',
    exact: true,
    component: PageImport('Agreement'),
  },
  /**
   * 登陆注册
   */
  {
    path: '/sign',
    exact: false,
    component: LayoutImport('BlankLayout'),
    pages: [
      {
        path: '/in',
        component: PageImport('SignIn'),
        exact: true,
      },
      {
        path: '/up',
        component: PageImport('SignUp'),
        exact: true,
      },
      {
        path: '/',
        redirect: '/sign/up',
      },
    ],
  },
  /**
   * 登录后的界面
   */
  {
    path: '/app',
    component: LayoutImport('BaseLayout'),
    exact: false,
    pages: [
      {
        path: '/pingUseRate',
        component: PageImport('PingUseRate'),
        exact: true,
      },
      {
        path: '/reportDay',
        component: PageImport('Reports/Day'),
        exact: true,
      },
      {
        path: '/reportWeek',
        component: PageImport('Reports/Week'),
        exact: true,
      },
      {
        path: '/reportMonth',
        component: PageImport('Reports/Month'),
        exact: true,
      },
      {
        path: '/sendArrange',
        component: PageImport('Send/SendArrange'),
        exact: true,
      },
      {
        path: '/sendList',
        component: PageImport('Send/SendList'),
        exact: true,
      },
      {
        path: '/sendlist/sendListDetail',
        component: PageImport('Send/SendListDetail'),
        exact: true,
      },
      {
        path: '/pingRecord',
        component: PageImport('Send/PingRecord'),
        exact: true,
      },
      {
        path: '/siteList',
        component: PageImport('SiteList'),
        exact: true,
      },
      {
        path: '/dewarPingCheck',
        component: PageImport('EquipmentCheck/DewarPingCheck'),
        exact: true,
      },
      {
        path: '/steelPingCheck',
        component: PageImport('EquipmentCheck/SteelPingCheck'),
        exact: true,
      },
      {
        path: '/sitesMap',
        component: PageImport('SitesMap'),
        exact: true,
      },
      {
        path: '/mount/:module',
        component: PluginLoader,
        exact: false,
      },
      /**
       * 登录后的主页
       */
      {
        path: '/',
        redirect: '/app/reportDay',
      },
    ],
  },
  /**
   * 管理页面
   */
  {
    path: '/manager',
    component: LayoutImport('BaseLayout'),
    exact: false,
    pages: [
      {
        path: '/user',
        component: PageImport('Manager/User'),
        exact: true,
      },
      {
        path: '/user/edit',
        component: PageImport('Manager/UserDetail'),
        exact: true,
      },
      {
        path: '/user/create',
        component: PageImport('Manager/UserDetail'),
        exact: true,
      },
      {
        path: '/role',
        component: PageImport('Manager/Role'),
        exact: true,
      },
      {
        path: '/role/edit',
        component: PageImport('Manager/RoleDetail'),
        exact: true,
      },
      {
        path: '/role/create',
        component: PageImport('Manager/RoleDetail'),
        exact: true,
      },
      {
        path: '/resources/edit',
        component: PageImport('Manager/Resources/Edit'),
        exact: true,
      },
      {
        path: '/resources/picker',
        component: PageImport('Manager/Resources/Picker'),
        exact: true,
      },
      {
        path: '/resources/choose',
        component: PageImport('Manager/Resources/ChooseParent'),
        exact: true,
      },
      {
        path: '/businessMgt/equipmentMgt',
        component: PageImport('Manager/BusinessMgt/EquipmentMgt'),
        exact: true,
      },
      {
        path: '/businessMgt/deviceMgt',
        component: PageImport('Manager/BusinessMgt/DeviceMgt'),
        exact: true,
      },
      {
        path: '/businessMgt/steelPingMgt',
        component: PageImport('Manager/BusinessMgt/SteelPingMgt'),
        exact: true,
      },
      {
        path: '/businessMgt/equipmentAddOrEdit',
        component: PageImport('Manager/BusinessMgt/EquipmentAddOrEdit'),
        exact: true,
      },
      {
        path: '/site',
        component: PageImport('Manager/Site'),
        exact: true,
      },
      {
        path: '/site/edit',
        component: PageImport('Manager/SiteEdit'),
        exact: true,
      },
      {
        path: '/businessMgt/pingSpecificationsMgt',
        component: PageImport('Manager/BusinessMgt/PingSpecificationsMgt'),
        exact: true,
      },
      /**
       * 登录后的主页
       */
      {
        path: '/',
        redirect: '/manager/reportDay',
      },
    ],
  },
  /**
   * 根路径默认指向位置
   */
  {
    path: '/',
    redirect: '/app/reportDay',
  },
];
