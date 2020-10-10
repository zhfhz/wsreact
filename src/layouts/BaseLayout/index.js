import { Badge, Layout, Avatar, Select } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { DesktopOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import logoImg from '@assets/image/logo.png';
import { needLogin } from '@components/Permission';
import styles from './style.less';
import LocaleSelect from '@components/LocaleSelect';
import NavMenu, { NavMenuBreadcrumb } from '@components/NavMenu';
import DropdownMenu from '@components/DropdownMenu';
import { resizeHandle } from '@utils/event';
import { session } from '@utils/session';
import { SESSION_STORAGE_KEYS } from '@/config/constants';

const { Header, Content, Sider, Footer } = Layout;

export const BaseLayoutContext = React.createContext({});

export default
@needLogin
@connect(
  ({ global }) => ({
    ...global,
  }),
  (dispatch) => ({
    onSelectLocale: (payload) =>
      dispatch({
        type: 'global/onSelectLocale',
        payload,
      }),
    siderTrigger: () =>
      dispatch({
        type: 'global/siderTrigger',
      }),
    setSelectTenant: (payload) =>
      dispatch({
        type: 'global/setSelectTenant',
        payload,
      }),
    logout: () =>
      dispatch({
        type: 'global/logout',
      }),
    getTenants: () =>
      dispatch({
        type: 'global/getTenants',
      }),
    initWebSocket: () =>
      dispatch({
        type: 'global/initWebSocket',
      }),
  })
)
class BaseLayout extends React.PureComponent {
  state = {
    showBreadcrumb: true,
  };

  componentDidMount() {
    const { getTenants, setSelectTenant, initWebSocket } = this.props;
    getTenants().then(() => {
      const tenantId = session.get(SESSION_STORAGE_KEYS.TENANT_ID);
      setSelectTenant(tenantId);
      const { tenants } = this.props;
      const tenant = tenants.find((item) => item.tenantId === tenantId) || {};
      session.set(SESSION_STORAGE_KEYS.SELECTED_TENANT, tenant);
    });
    initWebSocket();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { siderCollapsed } = this.props;
    if (prevProps.siderCollapsed !== siderCollapsed) {
      resizeHandle();
    }
  }

  setBreadcrumb = (visible) =>
    this.setState({
      showBreadcrumb: visible,
    });

  renderBreadcrumb = () => {
    const {
      navMenus,
      location: { pathname },
    } = this.props;
    return (
      <div className={styles.breadcrumbContainer}>
        <NavMenuBreadcrumb menus={navMenus} pathname={pathname} />
      </div>
    );
  };

  handleSetSelectTenant = (tenantId) => {
    const { setSelectTenant } = this.props;
    setSelectTenant(tenantId);
    location.reload();
  };

  render() {
    const {
      navMenus,
      locales,
      location: { pathname },
      children,
      logout,
      siderCollapsed,
      onSelectLocale,
      siderTrigger,
      tenants = [],
      selectTenant,
    } = this.props;
    const systemMenus = [
      {
        onClick: null,
        name: 'ForgetPass',
        icon: <DesktopOutlined />,
      },
      {
        onClick: null,
        name: 'Settings',
        icon: <DesktopOutlined />,
      },
      {
        onClick: logout,
        name: 'Logout',
        icon: <DesktopOutlined />,
      },
    ];
    const alertMenus = [];
    const tenantsMenu = tenants.map((item) => ({
      name: item.tenantName,
      value: item.tenantId,
    }));
    const { showBreadcrumb } = this.state;
    const langArr = location.search.match(/lang=([^&]+)/);
    const currentLocale = langArr && langArr[1];
    return (
      <Layout className={styles.BaseLayout}>
        <Sider
          className={styles.sider}
          trigger={null}
          collapsible
          collapsedWidth="60"
          collapsed={siderCollapsed}
          style={{ paddingTop: 50, overflowX: 'auto' }}
        >
          <div
            className={styles.logo}
            style={{
              position: 'fixed',
              top: 0,
              transition: 'all .2s',
              width: siderCollapsed ? 60 : 200,
              zIndex: 1000,
            }}
          >
            <a href="/">
              <img alt="" src={logoImg} />
              <span className={siderCollapsed ? styles.collapsed : ''}>
                ZIOT Portal
              </span>
            </a>
          </div>
          <NavMenu mode="inline" pathname={pathname} menus={navMenus} />
        </Sider>
        <Layout className="site-layout" style={{ paddingTop: 50 }}>
          <Header
            style={{
              padding: 0,
              position: 'fixed',
              top: 0,
              transition: 'all .2s',
              right: 0,
              width: `calc(100% - ${siderCollapsed ? 60 : 200}px)`,
              zIndex: 1000,
            }}
          >
            <div className={styles.toolBar}>
              {React.createElement(
                siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: styles.trigger,
                  onClick: siderTrigger,
                }
              )}
            </div>
            <div className={styles.systemBar}>
              <Select
                value={selectTenant}
                onChange={this.handleSetSelectTenant}
                style={{ width: 100 }}
              >
                {tenantsMenu.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
              <LocaleSelect
                locales={locales}
                onChange={onSelectLocale}
                defaultValue={currentLocale || ''}
              />
              <DropdownMenu key="AlertList" menus={alertMenus}>
                <Badge
                  count={11}
                  overflowCount={10}
                  className={styles.badgeSmall}
                >
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
              </DropdownMenu>
              <DropdownMenu key="CurrentUserMenu" menus={systemMenus}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </DropdownMenu>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '0 20px 20px',
              minHeight: 'auto',
            }}
          >
            {showBreadcrumb ? this.renderBreadcrumb() : null}
            <BaseLayoutContext.Provider
              value={{ showBreadcrumb: this.showBreadcrumb }}
            >
              {children}
            </BaseLayoutContext.Provider>
          </Content>
          <Footer>© 2018 Jiangsu Zillinx IOT Co.,Ltd.</Footer>
        </Layout>
      </Layout>
    );
  }
}
