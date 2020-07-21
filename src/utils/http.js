import http from 'axios';
import { encrypt, HmacSHA256 } from '@utils/str';
import { history } from '@router';
import { COMMON_KEYS, SESSION_STORAGE_KEYS } from '@/config/constants';

const { APP_ID } = COMMON_KEYS;
const { APP_SECRET } = COMMON_KEYS;

function setReqHeader(config) {
  const appId = APP_ID;
  const time = new Date().getTime().toString();
  const random = Math.random().toString();
  const userName = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_NAME) || '';
  const tenantId = sessionStorage.getItem(SESSION_STORAGE_KEYS.TENANT_ID) || '';
  const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN) || '';
  const sign = HmacSHA256(
    appId + time + random + userName + token,
    APP_SECRET
  ).toString();

  const headers = {
    appId,
    time,
    random,
    token,
    userName,
    tenantId,
    sign,
  };
  Object.keys(headers).forEach((key) => {
    if (headers[key]) {
      config.headers[key] = encrypt(headers[key]);
    }
  });

  const tokenInfo = {
    appId,
    time,
    random,
    token,
    userName,
    sign,
    tenantId,
  };
  sessionStorage.setItem(
    SESSION_STORAGE_KEYS.TOKEN_INFO,
    JSON.stringify(tokenInfo)
  );

  return config;
}

const DEV_URL = 'http://web.zillinx.com:18080/';
const PROD_URL = 'http://web.zillinx.com:8080/';
const baseURL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL;
const instance = http.create({
  baseURL,
});

instance.interceptors.request.use(setReqHeader, (err) => {
  return Promise.reject(err);
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.result !== null && response.data.result.code === 401) {
      console.log('会话超时!');
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.TOKEN);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.USER_NAME);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.TENANT_ID);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.TOKEN_INFO);
      history.push({
        pathname: '/sign/in',
      });
      return response.data;
    }
    if (response.data.result.code === 0) {
      return {
        ok: true,
        data: response.data,
      };
    }
    return {
      ok: false,
      data: response.data,
    };
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (err) => {
    if (err.status === -1) {
      //
    } else if (err.status === 401 || err.status === 403) {
      // 远程服务器无响应
    } else if (err.status === 500) {
      // 处理各类自定义错误
    } else if (err.status === 501) {
      // ...
    }
    return Promise.reject(err);
  }
);
export const { get } = instance;
export const { post } = instance;

export const Socket = function (url, protocols, autoConnect) {
  let webSocket = null;
  this.connected = false;
  let errorCount = 0;
  let userClose = false;
  let keepAliveTime = null;
  this.connect = () => {
    userClose = false;
    webSocket = new WebSocket(url, protocols);
    webSocket.onopen = () => {
      this.connected = true;
      console.log('websocket connected!');
    };
    webSocket.onclose = () => {
      this.connected = false;
      console.log('websocket connected!');
      if (autoConnect && !userClose) {
        setTimeout(() => this.reconnect(), 5000);
      }
    };
    webSocket.onmessage = (event) => {
      console.log('socket << ', event.data);
    };
    webSocket.onerror = (error) => {
      console.log('websocket error', error);
      this.connected = false;
      errorCount++;
      if (errorCount > 20) {
        return;
      }
      setTimeout(() => this.reconnect(), 1000);
    };
  };

  this.close = () => {
    clearTimeout(keepAliveTime);
    userClose = true;
    webSocket.close();
  };
  this.send = (msg) => {
    console.log('socket >> ', msg);
    webSocket.send(typeof msg === 'object' ? JSON.stringify(msg) : msg);
  };
  this.on = (event, func) => {
    if (!webSocket) {
      this.connect();
    }
    webSocket.addEventListener(event, func, false);
    return () => {
      webSocket.removeEventListener(event, func, false);
    };
  };
  this.keepAlive = (buildMsg, delay) => {
    const loop = () => {
      this.send(buildMsg());
      keepAliveTime = setTimeout(loop, delay);
    };
    keepAliveTime = setTimeout(loop, delay);
  };
  this.reconnect = () => {
    this.connect();
  };
  if (autoConnect) {
    this.connect();
  }
};
