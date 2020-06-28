import http from 'axios';
import { encrypt, HmacSHA256 } from '@utils';
import { history } from '@router';
import { COMMON_KEYS, SESSION_STORAGE_KEYS } from "@/config/constants";

const APP_ID = COMMON_KEYS.APP_ID;
const APP_SECRET = COMMON_KEYS.APP_SECRET;

function setReqHeader(config) {
    let appId = APP_ID;
    let time = new Date().getTime().toString();
    let random = Math.random().toString();
    let userName = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_NAME) || '';
    let tenantId = sessionStorage.getItem(SESSION_STORAGE_KEYS.TENANT_ID) || '';
    let token = sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN) || '';
    let sign = HmacSHA256(appId + time + random + userName + token, APP_SECRET).toString();

    const headers = {
        appId,
        time,
        random,
        token,
        userName,
        tenantId,
        sign
    };
    Object.keys(headers).forEach(key => {
        if (headers[key]) {
            config.headers[key] = encrypt(headers[key]);
        }
    });

    const tokenInfo = {"appId":appId,"time":time,"random":random,"token":token,"userName":userName,"sign":sign,"tenantId":tenantId};
    sessionStorage.setItem(SESSION_STORAGE_KEYS.TOKEN_INFO,JSON.stringify(tokenInfo));

    return config;
}

const DEV_URL = 'http://web.zillinx.com:18080/';
const PROD_URL = 'http://web.zillinx.com:8080/';
const baseURL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;
const instance = http.create({
    baseURL
});

instance.interceptors.request.use(
    setReqHeader,
    err => {
        return Promise.reject(err)
    }
);

instance.interceptors.response.use(
     response => {
        if(response.data.result !== null && (response.data.result.code === 401)) {
            console.log("会话超时!");
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.TOKEN);
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.USER_NAME);
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.TENANT_ID);
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.TOKEN_INFO);
            history.push({
                pathname: '/sign/in'
            });
            return response.data;
        }
         return response.data;
    },
    //接口错误状态处理，也就是说无响应时的处理
    err => {
        if(-1 === err.status) {
            //
        } else if(401 === err.status || 403 === err.status) {
            // 远程服务器无响应
        } else if(500 === err.status) {
            // 处理各类自定义错误
        } else if(501 === err.status) {
            // ...
        }
        return Promise.reject(err);
    }
);
export const get = instance.get;
export const post = instance.post;
