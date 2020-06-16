import { Layout, Menu } from 'antd';
import React from "react";
import { connect } from "dva";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import logoImg from '@assets/image/logo.png';
import styles from './style.less';
import LocaleSelect from '@components/LocaleSelect';
import NavMenu from '@components/NavMenu';
import UserMenu from '@components/UserMenu';
import { withRouter } from "react-router";

const { Header, Sider, Content, Footer } = Layout;

export default
@connect(({ global }) => ({
    ...global,
}), (dispatch) => ({
    onSelectLocale: payload => dispatch({
        type: 'global/onSelectLocale',
        payload
    }),
    siderTrigger: () => dispatch({
        type: 'global/siderTrigger',
    })
}))
class BaseLayout extends React.Component {
    render() {
        const {
            navMenus,
            locales,
            location: { pathname },
            children,
            siderCollapsed,
            onSelectLocale,
            siderTrigger } = this.props;
        const langArr= location.search.match(/lang=([^&]+)/);
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
                            <img src={logoImg} />
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
                            <UserMenu />
                            <LocaleSelect
                                locales={locales}
                                onChange={onSelectLocale}
                                defaultValue={currentLocale || ''}
                            />
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