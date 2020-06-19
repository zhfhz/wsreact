import React from "react";
import { UserOutlined, DesktopOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import { Menu, Avatar, Badge, Dropdown } from "antd";

const { Item, SubMenu } = Menu;

const menus = [
    {
        path: '/alert',
        name: 'alert',
    },
    {
        path: '/forget',
        name: 'forget_pwd',
    },
    {
        path: '/profile',
        name: 'settings',
    },
    {
        path: '/login',
        name: 'logout',
    }
];

const renderMenuItem = subMenus => {
    return subMenus.map(item => (
        <Item
            key={item.path}
            icon={<DesktopOutlined />}
            title={intl.get(item.name)}
        >
            <a href={`#${item.path}`}>{intl.get(item.name)}</a>
        </Item>
    ));
}

const renderMenu = menus => {
    return (
        <Menu>
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

export default ({ count = 0 }) => {
    return (
        <Dropdown
            overlay={renderMenu(menus)}
            overlayStyle={{
                minWidth: 150
            }}
        >
            <Badge count={count}>
                <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
        </Dropdown>
    );
}