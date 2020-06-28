import { Layout } from 'antd';
import React from "react";
import { connect } from "dva";
import { Input, Button } from 'antd';
import Icon from '@components/IconFont'
import { Link } from 'dva/router'
import logoImg from '@assets/image/logo.png';
import styles from './style.less';
import LocaleSelect from '@components/LocaleSelect';

const { Header, Content } = Layout;
const { Password } = Input;

export default
@connect(({ signIn, global, loading }) => ({
    ...global,
    ...signIn,
    loading: loading.effects.login
}), (dispatch) => ({
    onSelectLocale: payload => dispatch({
        type: 'global/onSelectLocale',
        payload
    }),
    login: () => dispatch({
        type: 'signIn/login'
    }),
    handleUserNameChange: e => dispatch({
        type: 'signIn/saveState',
        payload: {
            username: e.target.value
        }
    }),
    handlePasswordChange: e => dispatch({
        type: 'signIn/saveState',
        payload: {
            password: e.target.value
        }
    }),
}))
class SignIn extends React.PureComponent {
    render() {
        const {
            locales,
            username,
            password,
            handlePasswordChange,
            handleUserNameChange,
            login,
            loading,
            onSelectLocale } = this.props;
        const langArr= location.search.match(/lang=([^&]+)/);
        const currentLocale = langArr && langArr[1];
        return (
            <Layout className={styles.SignIn}>
                <Header style={{ padding: '16px 24px', boxSizing: 'content-box'}}>
                    <div className={styles.logo}>
                        <a href="/">
                            <img alt="" src={logoImg} />
                            <span>ZIOT Portal</span>
                        </a>
                    </div>
                    <div className={styles.systemBar}>
                        <LocaleSelect
                            locales={locales}
                            onChange={onSelectLocale}
                            defaultValue={currentLocale || ''}
                        />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '16px 24px',
                        minHeight: 'calc(100vh - 114px)',
                        position: "relative"
                    }}
                >
                    <div className={styles.signForm}>
                        <div className={styles.space}>
                            <header>智冷物联云平台</header>
                            <article>
                                <Input value={username} onChange={handleUserNameChange} style={{marginTop: 42}} size="large" addonBefore={<Icon type="iconshuruhaoma" fill="RGBA(41, 145, 219, 1)" width={22} height={22} />} name="username"/>
                                <Password value={password} onChange={handlePasswordChange} style={{marginTop: 20}} size="large" addonBefore={<Icon type="iconmima" fill="RGBA(41, 145, 219, 1)" width={22} height={22}/>} name="password" />
                            </article>
                            <Button className={styles.loginBtn} disabled={!username || !password} loading={loading} onClick={login} style={{marginTop: 28}}>
                                登录
                            </Button>
                            <footer>
                                <Link to="/b" className={styles.forget}>忘记密码</Link>
                                <Link to="/c" className={styles.signup}>立即注册&gt;</Link>
                                <br clear="both" />
                                <p>
                                    登录注册即表示同意<Link to="/a">用户协议、隐私条款</Link>。
                                </p>
                            </footer>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}