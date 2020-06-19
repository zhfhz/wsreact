import axios from 'axios';
import { encrypt, decrypt, RandUtilsEx, HmacSHA256 } from '@utils';

function setOuthHeader(config) {
    let appId = "1001";
    let time = new Date().getTime().toString();
    let random = Math.random().toString();
    let appSecret = "AjdYD6mYdMIdTaPH";
    let plainText = appId + time + random;
    let sign = HmacSHA256(plainText, appSecret).toString();

    appId = encrypt(appId);
    time = encrypt(time);
    random = encrypt(random);
    sign = encrypt(sign);

    config.headers["appId"] = appId;
    config.headers["time"] = time;
    config.headers["random"] = random;
    config.headers["sign"] = sign;

    return config;
}

function setTokenHeader (config) {
    let appId = "1001";
    let time = new Date().getTime().toString();
    let random = Math.random().toString();
    let appSecret = "AjdYD6mYdMIdTaPH";
    let token = sessionStorage.getItem("token");
    let userName = sessionStorage.getItem("userName");
    let tenantId = sessionStorage.getItem("tenantId");

    let plainText = appId + time + random + userName + token;

    let sign = HmacSHA256(plainText, appSecret).toString();

    appId = encrypt(appId);
    time = encrypt(time);
    random = encrypt(random);
    token = encrypt(token);
    sign = encrypt(sign);
    userName = encrypt(userName);
    tenantId = encrypt(tenantId);

    config.headers["appId"] = appId;
    config.headers["time"] = time;
    config.headers["random"] = random;
    config.headers["token"] = token;
    config.headers["userName"] = userName;
    config.headers["sign"] = sign;
    config.headers["tenantId"] = tenantId;

    const tokenInfo = {"appId":appId,"time":time,"random":random,"token":token,"userName":userName,"sign":sign,"tenantId":tenantId};
    sessionStorage.setItem("_TOKEN_INFO_",JSON.stringify(tokenInfo));
    return config;
}


const DEV_URL = 'http://web.zillinx.com:18080/';
const PROD_URL = 'http://web.zillinx.com:8080/';
const baseURL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;
const instance = axios.create({
    baseURL
});

instance.interceptors.request.use(
    config => {
        if(config.url == "api/link-service/v1/oauth/gettoken") {
            return setOuthHeader(config);
        }
        return setTokenHeader(config);
    },
    err => {
        return Promise.reject(err)
    }
);

instance.interceptors.response.use(
    response => {
        if(response.data.result != null && (response.data.result.code == 401)) {
            console.log("会话超时!");
            sessionStorage.removeItem("token");
        }
        return response;
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
