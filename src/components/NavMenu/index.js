import React from 'react';
import Permission from '@components/Permission';
import intl from 'react-intl-universal';
import { Breadcrumb, Menu } from 'antd';
import IconFont from '@components/IconFont';
import { history } from '@router';
import { floorTreeWithKey } from '@utils/obj';

const { Item, SubMenu } = Menu;

const CACHE = [];

const renderMenus = (menus) => {
  return menus.map((item, index) => {
    if (
      item.hideMenu !== true &&
      ((item.children && item.hideChild === true) || !item.children)
    ) {
      return (
        <Permission key={item.key} ands={item.permission || []}>
          <Item
            key={item.key}
            icon={<IconFont width={20} height={20} type={item.icon} />}
          >
            <a onClick={() => history.push(item.path)}>{intl.get(item.name)}</a>
          </Item>
        </Permission>
      );
    }
    if (item.children) {
      return renderSubMenu(item);
    }
    return null;
  });
};

const renderSubMenu = (item) => {
  return (
    <Permission key={item.key} ands={item.permission || []}>
      <SubMenu
        key={item.key}
        icon={<IconFont width={20} height={20} type={item.icon} />}
        title={intl.get(item.name)}
      >
        {renderMenus(item.children)}
      </SubMenu>
    </Permission>
  );
};

const getOpenMenus = (pathname, menus) => {
  if (CACHE.length === 0) {
    floorTreeWithKey(menus, 'children').forEach((item) => {
      CACHE.push(item);
    });
  }
  const openKeys = [];
  let target = CACHE.find(
    (item) => item.path === pathname || `${item.path}/` === pathname
  );
  if (!target) {
    return openKeys;
  }
  openKeys.push(target);
  while (target.parent) {
    target = target.parent;
    openKeys.push(target);
  }
  return openKeys.reverse();
};

// 以菜单为路径自动生成面包屑条
export const NavMenuBreadcrumb = ({ pathname, menus }) => {
  const openMenus = getOpenMenus(pathname, menus);
  const lastMenu = openMenus.pop();
  return lastMenu ? (
    <Breadcrumb>
      <Breadcrumb.Item key="key_index_home">
        <a href="#/">{intl.get('Home')}</a>
      </Breadcrumb.Item>
      {openMenus.map(({ name, path, key, children = [], hideChild, icon }) => {
        return (
          <Breadcrumb.Item key={key}>
            {hideChild === true ? (
              <a href={`#${path}`}>
                <IconFont width={14} height={14} type={icon} />
                &nbsp;
                {intl.get(name)}
              </a>
            ) : (
              <span>
                <IconFont width={14} height={14} type={icon} />
                &nbsp;
                {intl.get(name)}
              </span>
            )}
          </Breadcrumb.Item>
        );
      })}
      <Breadcrumb.Item key="key_index_current">
        <IconFont width={14} height={14} type={lastMenu.icon} />
        &nbsp;
        {intl.get(lastMenu.name)}
      </Breadcrumb.Item>
    </Breadcrumb>
  ) : null;
};

export default ({ menus, pathname, ...rest }) => {
  const openMenus = getOpenMenus(pathname, menus);
  const selectedMenu = openMenus.pop();
  const openKeys = openMenus.map(({ key }) => key);
  return (
    <Menu
      {...rest}
      selectedKeys={selectedMenu ? [selectedMenu.key] : []}
      defaultOpenKeys={openKeys}
    >
      {renderMenus(menus)}
    </Menu>
  );
};
