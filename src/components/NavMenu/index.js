import React from "react";
import {DesktopOutlined} from "@ant-design/icons";
import intl from "react-intl-universal";
import {Menu} from "antd";
import {floorTree} from '@utils/obj';

const {Item, SubMenu} = Menu;

const renderMenuItem = subMenus => {
    return subMenus.map(item => (
        <Item
            key={item.path}
            icon={<DesktopOutlined/>}
            title={intl.get(item.name)}
        >
            <a href={`#${item.path}`}>{intl.get(item.name)}</a>
        </Item>
    ));
};

const getMenuOpenKeys = (pathname, menus) => {
    const CACHE = floorTree(menus);
    const openKeys = [];
    let target = CACHE.find(item => item.path === pathname);
    if (!target) {
        return [];
    }
    while (target.parent) {
        openKeys.push(target.parent.path);
        target = target.parent;
    }
    return openKeys;
};

const getSelectedKeys = (pathname, menus) => {
    const CACHE = floorTree(menus);
    let target = CACHE.find(item => pathname.indexOf(item.path) === 0);
    if (!target) {
        return [];
    }
    return [target.path];
};

export default ({ menus, pathname, ...rest }) => {
    return (
        <Menu
            {...rest}
            openKeys={getMenuOpenKeys(pathname, menus)}
            selectedKeys={getSelectedKeys(pathname, menus)}
        >
            {
                menus.map(item => {
                    if (item.children && item.children.length) {
                        return (
                            <SubMenu
                                key={item.path}
                                icon={<DesktopOutlined />}
                                title={intl.get(item.name)}
                            >
                                {renderMenuItem(item.children)}
                            </SubMenu>
                        );
                    } else {
                        return renderMenuItem([item]);
                    }
                })
            }
        </Menu>
    );
}