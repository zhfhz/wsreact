import {Alert, Button, Input, Layout} from 'antd';
import React from "react";
import {connect} from "dva";
import Icon from '@components/IconFont'
import {Link} from 'dva/router'
import logoImg from '@assets/image/logo.png';
import styles from './style.less';
import LocaleSelect from '@components/LocaleSelect';
import intl from 'react-intl-universal';
import Transition from "@components/Transition";

const {Header, Content} = Layout;
const {Password} = Input;

export default @connect(({signIn, global, loading}) => ({
    ...global,
    ...signIn,
    loading: loading.effects.login
}), {
    onSelectLocale: payload => ({
        type: 'global/onSelectLocale',
        payload
    }),
    login: () => ({
        type: 'signIn/login'
    }),
    handleUserNameChange: e => ({
        type: 'signIn/save',
        payload: {
            username: e.target.value,
            showErr: false
        }
    }),
    handlePasswordChange: e => ({
        type: 'signIn/save',
        payload: {
            password: e.target.value,
            showErr: false
        }
    }),
})
class SignIn extends React.PureComponent {
    handleLoginBtnEnter = e => {
        const {login} = this.props;
        if (e.keyCode === 13) {
            login()
        }
    };

    render() {
        const {
            locales,
            username,
            password,
            handlePasswordChange,
            handleUserNameChange,
            login,
            showErr,
            loading,
            onSelectLocale
        } = this.props;
        const langArr = location.search.match(/lang=([^&]+)/);
        const currentLocale = langArr && langArr[1];
        return (
            <Layout className={styles.SignIn}>
                <Header style={{padding: '16px 24px', boxSizing: 'content-box'}}>
                    <div className={styles.logo}>
                        <a href="/">
                            <img alt="" src={logoImg}/>
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
                            <header style={{marginBottom: 22}}>{intl.get('APP_NAME')}</header>
                            <article>
                                <Transition>
                                    {
                                        showErr &&
                                        <Alert message={intl.get('SIGN_IN_LINK_LOGIN_FAILED')} type="error" showIcon/>
                                    }
                                </Transition>
                                <form>
                                    <Input value={username} placeholder={intl.get('SIGN_IN_ACCOUNT_PLACEHOLDER')}
                                           onChange={handleUserNameChange} style={{marginTop: 20}}
                                           size="large"
                                           addonBefore={<Icon type="iconshuruhaoma" fill="RGBA(41, 145, 219, 1)"
                                                              width={22}
                                                              height={22}/>} name="username"/>
                                    <Password placeholder={intl.get('SIGN_IN_PWD_PLACEHOLDER')}
                                              onKeyDown={this.handleLoginBtnEnter} value={password}
                                              onChange={handlePasswordChange} style={{marginTop: 20}} size="large"
                                              addonBefore={<Icon type="iconmima" fill="RGBA(41, 145, 219, 1)" width={22}
                                                                 height={22}/>} name="password"/>
                                </form>
                            </article>
                            <Button className={styles.loginBtn} disabled={!username || !password} loading={loading}
                                    onClick={login} style={{marginTop: 28}}>
                                {intl.get('SIGN_IN_LOGIN')}
                            </Button>
                            <footer>
                                <Link to="/b" className={styles.forget}>{intl.get('SIGN_IN_LINK_FORGET')}</Link>
                                <Link to="/c" className={styles.signup}>{intl.get('SIGN_IN_LINK_REGISTER')}&gt;</Link>
                                <br clear="both"/>
                                <p>
                                    {intl.getHTML('SIGN_IN_LINK_AGREEMENT')}
                                </p>
                            </footer>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}