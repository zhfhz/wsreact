import { session } from '@utils/session';
import { SESSION_STORAGE_KEYS } from '@/config/constants';

/**
 * 检查是否同时包含指定权限
 */
export const CheckEveryPermission = (permissions = []) => {
  const UserPermissions =
    session.get(SESSION_STORAGE_KEYS.USER_INFO).ress || [];
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
  const UserPermissions =
    session.get(SESSION_STORAGE_KEYS.USER_INFO).ress || [];
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
  return session.get(SESSION_STORAGE_KEYS.TOKEN);
};
