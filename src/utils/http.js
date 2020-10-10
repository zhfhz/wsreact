import http from 'axios';
import { message } from 'antd';
import intl from 'react-intl-universal';
import { encrypt, HmacSHA256 } from '@utils/str';
import { session } from '@utils/session';
import { history } from '@router';
import { COMMON_KEYS, SESSION_STORAGE_KEYS } from '@/config/constants';

const { APP_ID } = COMMON_KEYS;
const { APP_SECRET } = COMMON_KEYS;
const { CancelToken } = http;

let cancelRequest = () => {};
let unListenCancelRequest = () => {};

function setReqHeader(config) {
  const appId = APP_ID;
  const time = new Date().getTime().toString();
  const random = Math.random().toString();
  const userName = session.get(SESSION_STORAGE_KEYS.USER_NAME) || '';
  const tenantId = session.get(SESSION_STORAGE_KEYS.TENANT_ID) || '';
  const token = session.get(SESSION_STORAGE_KEYS.TOKEN) || '';
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
  unListenCancelRequest = history.listen(function (e) {
    cancelRequest('request aborted');
  });
  session.set(SESSION_STORAGE_KEYS.TOKEN_INFO, tokenInfo);
  config.cancelToken = new CancelToken((cancel) => {
    cancelRequest = cancel;
  });
  return config;
}

const baseURL = window.location.origin;
const instance = http.create({
  baseURL,
});

instance.interceptors.request.use(setReqHeader, (err) => {
  return Promise.reject(err);
});

instance.interceptors.response.use(
  (response) => {
    unListenCancelRequest();
    if (response.data.result) {
      if (response.data.result.code === 401) {
        message.error(intl.get('SessionTimeout'));
        session.clear();
        history.push({
          pathname: '/sign/in',
        });
        return response.data;
      } else if (response.data.result.code === 0) {
        return {
          ok: true,
          data: response.data,
        };
      } else {
        console.error(intl.get('RequestFail'), response.data.result.msg);
        return {
          ok: false,
          data: response.data,
        };
      }
    } else {
      return response.data;
    }
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (err) => {
    unListenCancelRequest();
    if (http.isCancel(err)) {
      return Promise.resolve(err);
    }
    message.error(intl.get('NetworkErr'));
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

export const { get, post } = instance;

export const uploadFile = (url, params) => {
  let formData = params;
  if (!(params instanceof FormData)) {
    formData = new FormData();
    Object.keys(params).forEach((itemKey) => {
      formData.append(itemKey, params[itemKey]);
    });
  }
  const promise = post(url, formData, {
    headers: {
      'Content-Type': void 0,
    },
  });
  return promise;
};
/**
 * 下载文件
 * @param url
 * @param params
 * @returns {{save(*, *=): Promise<void>}|Promise<AxiosResponse<any>>}
 */
export const downloadFile = (url, params) => {
  const promise = post(url, params, {
    responseType: 'arraybuffer',
  });
  return {
    save(filename, acceptType) {
      return promise
        .then((response) => {
          const objectUrl = URL.createObjectURL(
            new Blob([response], { type: acceptType })
          );
          let link = document.createElement('a');
          link.href = objectUrl;
          link.download = filename;
          link.click();
          link.remove();
          URL.revokeObjectURL(objectUrl);
        })
        .catch((err) => {
          const enc = new TextDecoder('utf-8');
          const res = JSON.parse(enc.decode(new Uint8Array(err.data))); //转化成json对象
          console.log(res);
        });
    },
  };
};

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
