import dynamic from 'dva/dynamic';
import Crypto from 'crypto-js';

const { mode: { CBC }, AES, enc: { Latin1, Utf8 }, pad: { ZeroPadding } } = Crypto;
const AES_KEY = 'VTlRUB1fQplU2FnU';
const AES_VAL = 'hTHBk7pioapRgTdc';

const source = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const letter = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";
const mark = "qrstuvwxyzAB";


/**
 * 页面路由动态组件造
 * @param app
 * @param models
 * @param component
 */
export const dynamicWrapper = (app, models, component) => {
    return dynamic({
        app,
        models: () => models,
        component: () => component
    })
}

/**
 * 树状结构数据，平铺展开
 * @param treeData 树顶级对象数组
 * @param childField 子节点 字段名
 * @returns {[]}
 */
export const floorTree = (treeData, childField) => {
    // treeData 是数组构建一个根节点
    const data = treeData instanceof Array ? { [childField]: treeData } : treeData;
    const result = [];
    const loop = (arr, parent = null) => {
        arr.forEach(item => {
            result.push({
                ...item,
                parent,
            });
            if (item[childField]) {
                loop(item[childField], item);
            }
        })
    }
    loop(data[childField]);
    return result;
}

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
    const pwd = lettval + numval + markval + range;
    return pwd;
}

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
}

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
    const pwd = lettval + numval + markval + range;
    return pwd;
}

/**
 * AES 加密
 * @param data
 * @returns {string}
 */
export const encrypt = data => {
    const key = Latin1.parse(AES_KEY);
    const iv = Latin1.parse(AES_VAL);
    return AES.encrypt(data, key, {iv:iv,mode: CBC,padding: ZeroPadding}).toString();
};

/**
 * AES解密
 * @param endata
 * @returns {string|*}
 */
export const decrypt = endata => {
    const key = Latin1.parse(AES_KEY);
    const iv = Latin1.parse(AES_VAL);
    if(typeof(endata) != undefined && endata !=null) {
        return AES.decrypt(endata, key, {iv:iv,mode: CBC,padding: ZeroPadding}).toString(Utf8);
    } else {
        return endata;
    }
};

export const HmacSHA256 = require('crypto-js/hmac-sha256');