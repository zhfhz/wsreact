import CryptoJS from 'crypto-js';
import { history } from '@router/index';

export const AES = CryptoJS.AES;

export const HmacSHA256 = CryptoJS.HmacSHA256;

export const Utf8 = CryptoJS.enc.Utf8;

export const ZeroPadding = CryptoJS.pad.ZeroPadding;

export const CBC = CryptoJS.mode.CBC;

export const Latin1 = CryptoJS.enc.Latin1;

const AES_KEY = 'VTlRUB1fQplU2FnU';
const AES_VAL = 'hTHBk7pioapRgTdc';

const source = 'abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const letter = 'abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const number = '0123456789';
const mark = 'qrstuvwxyzAB';

/**
 * 指定字符范围生成随机字符
 * @returns {string}
 * @constructor
 */
export const generateRand = (length, resource) => {
  length = length || 32;
  let s = '';
  for (let i = 0; i < length; i++) {
    s += resource.charAt(Math.ceil(Math.random() * 1000) % resource.length);
  }
  return s;
};

/**
 * 生成16位随机字符
 * @returns {string}
 * @constructor
 */
export const GenSeqNo16 = () => {
  const range = generateRand(13, source);
  const lettval = generateRand(1, letter);
  const numval = generateRand(1, number);
  const markval = generateRand(1, mark);
  return lettval + numval + markval + range;
};

/**
 * AES 加密
 * @param data
 * @returns {string}
 */
export const encrypt = (data) => {
  const key = Latin1.parse(AES_KEY);
  const iv = Latin1.parse(AES_VAL);
  return AES.encrypt(data, key, {
    iv,
    mode: CBC,
    padding: ZeroPadding,
  }).toString();
};

/**
 * AES解密
 * @param endata
 * @returns {string|*}
 */
export const decrypt = (endata) => {
  const key = Latin1.parse(AES_KEY);
  const iv = Latin1.parse(AES_VAL);
  if (typeof endata !== void 0 && endata != null) {
    return AES.decrypt(endata, key, {
      iv,
      mode: CBC,
      padding: ZeroPadding,
    }).toString(Utf8);
  }
  return endata;
};

/**
 * 生成8位随机字符
 * @returns {string}
 * @constructor
 */
export const GenSeqNo = () => {
  const range = generateRand(5, source);
  const lettval = generateRand(1, letter);
  const numval = generateRand(1, number);
  const markval = generateRand(1, mark);
  return lettval + numval + markval + range;
};

/**
 * 将toJSON字符串转为json
 * @param hashSearch
 * @returns {{toJSON: (function(): {})}}
 * @constructor
 */
export const HashSearchParams = (hashSearch) => ({
  toJSON: () => {
    const result = {};
    if (hashSearch) {
      const search = new URLSearchParams(hashSearch);
      const iterator = search.keys();
      let item = {};
      do {
        item = iterator.next();
        if (item.value) {
          result[item.value] = search.get(item.value);
        }
      } while (!item.done);
    }
    return result;
  },
});

export const fixedPaginationBug = (currentTotal, newTotal) => {
  const {
    location: { search, pathname },
  } = history;
  const query = HashSearchParams(search).toJSON();
  if (query.pageNum && currentTotal === 0 && newTotal === null) {
    const newSearch = new URLSearchParams({
      ...query,
      pageNum: 1,
    }).toString();
    history.push({
      pathname,
      search: newSearch,
    });
    return false;
  }
  return true;
};
