import Crypto from 'crypto-js';

const {mode: {CBC}, AES, enc: {Latin1, Utf8}, pad: {ZeroPadding}} = Crypto;
const AES_KEY = 'VTlRUB1fQplU2FnU';
const AES_VAL = 'hTHBk7pioapRgTdc';

const source = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const letter = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";
const mark = "qrstuvwxyzAB";

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
 * 指定字符范围生成随机字符
 * @returns {string}
 * @constructor
 */
export const generateRand = (length, resource) => {
    length = length || 32;
    let s = "";
    for (let i = 0; i < length; i++) {
        s += resource.charAt(
            Math.ceil(Math.random() * 1000) % resource.length
        );
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
export const encrypt = data => {
    const key = Latin1.parse(AES_KEY);
    const iv = Latin1.parse(AES_VAL);
    return AES.encrypt(data, key, {iv: iv, mode: CBC, padding: ZeroPadding}).toString();
};

/**
 * AES解密
 * @param endata
 * @returns {string|*}
 */
export const decrypt = endata => {
    const key = Latin1.parse(AES_KEY);
    const iv = Latin1.parse(AES_VAL);
    if (typeof (endata) !== void (0) && endata != null) {
        return AES.decrypt(endata, key, {iv: iv, mode: CBC, padding: ZeroPadding}).toString(Utf8);
    } else {
        return endata;
    }
};

export const HmacSHA256 = require('crypto-js/hmac-sha256');