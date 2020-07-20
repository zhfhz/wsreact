import {Badge, Layout, Avatar, Button} from 'antd';
import React from "react";
import {connect} from "dva";
import {DesktopOutlined, UserOutlined} from "@ant-design/icons";
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import logoImg from '@assets/image/logo.png';
import styles from './style.less';
import LocaleSelect from '@components/LocaleSelect';
import NavMenu from '@components/NavMenu';
import DropdownMenu from '@components/DropdownMenu';

const {Header, Content, Sider, Footer} = Layout;

export default @connect(({global}) => ({
    ...global,
}), (dispatch) => ({
    onSelectLocale: payload => dispatch({
        type: 'global/onSelectLocale',
        payload
    }),
    siderTrigger: () => dispatch({
        type: 'global/siderTrigger',
    }),
    logout: () => dispatch({
        type: 'global/logout'
    })
}))
class BaseLayout extends React.Component {
    render() {
        const {
            navMenus,
            locales,
            location: {pathname},
            children,
            logout,
            siderCollapsed,
            onSelectLocale,
            siderTrigger
        } = this.props;
        const menus = [
            {
                onClick: null,
                wrapper: ({children}) => (<Badge dot={1}>{children}</Badge>),
                name: 'alert',
                icon: <DesktopOutlined />
            },
            {
                onClick: null,
                name: 'forget_pwd',
                icon: <DesktopOutlined />
            },
            {
                onClick: null,
                name: 'settings',
                icon: <DesktopOutlined />
            },
            {
                onClick: logout,
                name: 'logout',
                icon: <DesktopOutlined />
            }
        ];
        const langArr = location.search.match(/lang=([^&]+)/);
        const currentLocale = langArr && langArr[1];
        return (
            <Layout className={styles.BaseLayout}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsedWidth="60"
                    collapsed={siderCollapsed}
                >
                    <div className={styles.logo}>
                        <a href="/">
                            <img alt="" src={logoImg} />
                            <span className={siderCollapsed ? styles.collapsed : ''}>ZIOT Portal</span>
                        </a>
                    </div>
                    <NavMenu mode="inline" pathname={pathname} menus={navMenus} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <div className={styles.toolBar}>
                            {React.createElement(siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: styles.trigger,
                                onClick: siderTrigger,
                            })}
                        </div>
                        <div className={styles.systemBar}>
                            <DropdownMenu key="AvailableAcountMenu" menus={menus}>
                                <Button>我的集团</Button>
                            </DropdownMenu>
                            <LocaleSelect
                                locales={locales}
                                onChange={onSelectLocale}
                                defaultValue={currentLocale || ''}
                            />
                            <DropdownMenu key="CurrentUserMenu" menus={menus}>
                                <Badge dot={1}>
                                    <Avatar shape="square" icon={<UserOutlined/>}/>
                                </Badge>
                            </DropdownMenu>
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            minHeight: 'calc(100vh - 158px)',
                        }}
                    >
                        {children}
                    </Content>
                    <Footer>
                        © 2018  Jiangsu Zillinx IOT Co.,Ltd.
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}