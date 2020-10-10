import {
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  COMMON_KEYS,
} from '@/config/constants';
import { HmacSHA256 } from '@utils/str';

const namespace = HmacSHA256(
  JSON.stringify(SESSION_STORAGE_KEYS),
  COMMON_KEYS.APP_SECRET
).toString();

class Session {
  constructor() {
    const cacheStr = localStorage.getItem(
      LOCAL_STORAGE_KEYS.UTIL_SESSION_CACHE
    );
    const Storage = JSON.parse(cacheStr || '{}');
    if (cacheStr) {
      Object.values(Storage).forEach((item, index) => {
        const sessionValue = localStorage.getItem(`${item}`);
        sessionStorage.setItem(`${item}`, sessionValue);
      });
    }
    window.addEventListener(
      'storage',
      (e) => {
        const { key, newValue } = e;
        if (key === null) {
          return;
        }
        if (key.endsWith(namespace)) {
          if (newValue === null) {
            sessionStorage.removeItem(key);
            delete Storage[key.split('_')[0]];
          } else {
            sessionStorage.setItem(key, newValue);
          }
        }
      },
      false
    );
  }
  get = (key) => {
    const Storage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.UTIL_SESSION_CACHE) || '{}'
    );
    return JSON.parse(sessionStorage.getItem(Storage[key]));
  };
  set = (key, value) => {
    const Storage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.UTIL_SESSION_CACHE) || '{}'
    );
    Storage[key] = `${key}${namespace}`;
    sessionStorage.setItem(Storage[key], JSON.stringify(value));
    localStorage.setItem(Storage[key], JSON.stringify(value));
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.UTIL_SESSION_CACHE,
      JSON.stringify(Storage)
    );
  };
  clear = () => {
    new Array(sessionStorage.length).fill(0).forEach((_, index) => {
      const key = sessionStorage.key(index);
      localStorage.removeItem(key);
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.UTIL_SESSION_CACHE);
    sessionStorage.clear();
  };
}

export const session = new Session();
