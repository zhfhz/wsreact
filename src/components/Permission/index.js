import React from 'react';
import NotFound from '@pages/NotFound';
import { Redirect } from 'dva/router';
import {
  CheckEveryPermission,
  CheckOnePermission,
  isLogin,
} from '@utils/permission';

/**
 * 页面需要权限
 * @param permissions
 * @returns {function(*): function(...[*]=)}
 */
export const needPermission = (ands, ors) => {
  return (Compo) => {
    return (props) => {
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
    };
  };
};

export default ({ ands, ors, children, ...restProps }) => {
  if (
    CheckEveryPermission(ands instanceof Array ? ands : ands ? [ands] : []) &&
    CheckOnePermission(ors instanceof Array ? ors : ors ? [ors] : [])
  ) {
    return React.Children.map(children, (item) => {
      return React.cloneElement(item, restProps);
    });
  } else {
    return null;
  }
};

/**
 * 页面需要登录
 * @returns {function(*): function(...[*]=)}
 */
export const needLogin = (Compo) => {
  return (props) => {
    if (isLogin()) {
      return <Compo {...props} />;
    } else {
      return <Redirect to="/sign/in" push={true} />;
    }
  };
};
