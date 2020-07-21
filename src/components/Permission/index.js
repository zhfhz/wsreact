import React from 'react';
import NotFound from '@pages/NotFound';
import { Redirect } from 'dva/router';
import { SESSION_STORAGE_KEYS } from '@/config/constants';

const UserPermissions = ['xxx'];

/**
 * 获取用户权限时添加保存权限列表
 * @param args
 */
export const setUserPermissions = (...args) => {
  UserPermissions.push.apply(UserPermissions, args);
};

/**
 * 清空权限列表
 */
export const clearUserPermissions = () => {
  UserPermissions.splice(0, UserPermissions.length);
};

/**
 * 检查是否同时包含指定权限
 */
export const CheckEveryPermission = (permissions = []) => {
  if (permissions instanceof Array) {
    return permissions.length
      ? permissions.every((item) => UserPermissions.indexOf(item) > -1)
      : true;
  }
  return permissions ? CheckEveryPermission([permissions]) : true;
};

/**
 * 检查是否包含给定的权限之一
 */
export const CheckOnePermission = (permissions = []) => {
  if (permissions instanceof Array) {
    return permissions.length
      ? permissions.some((item) => UserPermissions.indexOf(item) > -1)
      : true;
  }
  return permissions ? CheckOnePermission([permissions]) : true;
};

/**
 * 检查是否登录
 */
export const isLogin = () => {
  return sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN);
};

/**
 * 页面需要权限
 * @param permissions
 * @returns {function(*): function(...[*]=)}
 */
export const needPermission = (ands, ors) => {
  return (Compo) => {
    return class NeedPermission extends React.PureComponent {
      render() {
        const { props } = this;
        if (
          CheckEveryPermission(
            ands instanceof Array ? ands : ands ? [ands] : []
          ) &&
          CheckOnePermission(ors instanceof Array ? ors : ors ? [ors] : [])
        ) {
          return <Compo {...props} />;
        } else {
          return <NotFound />;
        }
      }
    };
  };
};

/**
 * 页面需要登录
 * @returns {function(*): function(...[*]=)}
 */
export const needLogin = (Compo) => {
  return class NeedLogin extends React.PureComponent {
    render() {
      const { props } = this;
      if (isLogin()) {
        return <Compo {...props} />;
      } else {
        return <Redirect to="/sign/in" push={true} />;
      }
    }
  };
};
