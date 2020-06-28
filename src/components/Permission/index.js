import React from "react";
import NotFound from "@pages/NotFound";
import { Redirect } from 'dva/router';
import {SESSION_STORAGE_KEYS} from "@/config/constants";

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
 * 检查是否包含指定权限 或校验
 */
export const hasPermission = (permissions = []) => {
    if (permissions instanceof Array && permissions.length) {
        return permissions && permissions.length && permissions.find(item => UserPermissions.indexOf(item) > -1);
    }
    return true;
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
export const needPermission = (permissions) => {
    return Compo => {
        return (props) => {
            if (hasPermission(permissions)) {
                return <Compo {...props}/>
            } else {
                return <NotFound />
            }
        }
    }
};

/**
 * 页面需要登录
 * @returns {function(*): function(...[*]=)}
 */
export const needLogin = Compo => {
    return (props) => {
        if (isLogin()) {
            return <Compo {...props} />;
        } else {
            return <Redirect to="/sign/in" push={true} />;
        }
    }
};
