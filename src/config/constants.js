export const COMMON_KEYS = {
  APP_ID: '1001',
  APP_SECRET: 'AjdYD6mYdMIdTaPH',
};

export const SESSION_STORAGE_KEYS = {
  TOKEN: 'token',
  SOCKET_URL: 'SOCKET_URL',
  TOKEN_INFO: '_TOKEN_INFO_',
  USER_NAME: 'userName',
  TENANT_ID: 'tenantId',
  SELECTED_TENANT: 'selected_tenant',
  USER_INFO: 'userInfo',
};

export const LOCAL_STORAGE_KEYS = {
  ASIDE_NAV_COLLAPSED: 'global_sider_collapsed',
  UTIL_SESSION_CACHE: 'util_session_cache',
};

export const RESOURCE_MANAGER_MODE = {
  EMPTY: 0,
  SELECTION: 1,
  CHOOSE: 2,
  EDIT: 3,
};

/**
 * 气体相关定义
 * @type {{LN2: {symbol: string, color: string, text: string}, LNG: {symbol: string, color: string, text: string}, LHe: {symbol: string, color: string, text: string}, LCO2: {symbol: string, color: string, text: string}, LAr: {symbol: string, color: string, text: string}, LO2: {symbol: string, color: string, text: string}}}
 */
export const GAS_CONFIG = {
  LO2: {
    symbol: 'O₂',
    color: 'rgba(0, 128, 219, 1)',
    text: '氧气',
  },
  LN2: {
    symbol: 'N₂',
    color: 'rgba(236, 72, 72, 1)',
    text: '氮气',
  },
  LAr: {
    symbol: 'Ar',
    color: 'rgba(243, 152, 33, 1)',
    text: '氩气',
  },
  LHe: {
    symbol: 'He',
    color: 'rgba(28, 159, 71, 1)',
    text: '氦气',
  },
  LCO2: {
    symbol: 'CO₂',
    color: 'rgba(133, 138, 147, 1)',
    text: '二氧化碳',
  },
  LNG: {
    symbol: 'CₙHₙ',
    color: 'rgba(255, 255, 255, 1)',
    text: '液态天然气',
  },
};
export const GAS_CONFIG_LIST = Object.keys(GAS_CONFIG).map((key) => {
  return {
    ...GAS_CONFIG[key],
    value: key,
  };
});
