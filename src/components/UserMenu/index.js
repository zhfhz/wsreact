import React from "react";
import { UserOutlined, DesktopOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import { Menu, Avatar, Badge, Dropdown } from "antd";

const {Item, SubMenu} = Menu, renderMenuItem = subMenus => {
    return subMenus.map(item => (
        <Item
            key={item.path}
            icon={<DesktopOutlined/>}
            title={intl.get(item.name)}
            onClick={item.onClick}
        >
            {item.wrapper && <item.wrapper><span>{intl.get(item.name)}</span></item.wrapper> || <span>{intl.get(item.name)}</span>}
        </Item>
    ));
}, renderMenu = menus => {
    return (
        <Menu>
            {
                menus.map(item => {
                    if (item.children && item.children.length) {
                        return (
                            <SubMenu
                                key={item.path}
                                icon={<DesktopOutlined/>}
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
};

export default ({ count = 0, menus = [] }) => {
    return (
        <Dropdown
            overlay={renderMenu(menus)}
            overlayStyle={{
                minWidth: 150
            }}
        >
            <Badge dot={count >= 1}>
                <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
        </Dropdown>
    );
};
