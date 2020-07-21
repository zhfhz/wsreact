import { SESSION_STORAGE_KEYS } from '@/config/constants';
import { history } from '@router/index';
import { login } from './service';

export default {
  namespace: 'signIn',
  state: {
    username: '',
    password: '',
    showErr: false,
  },
  effects: {
    *login(_, { call, put, select }) {
      const signInState = yield select((state) => ({
        ...state.signIn,
      }));
      const { data, ok } = yield call(login, { ...signInState });
      if (ok) {
        const { token } = data;
        if (data.serverUrl != null && data.serverUrl.wsUrl != null) {
          sessionStorage.setItem(
            SESSION_STORAGE_KEYS.SOCKET_URL,
            data.serverUrl.wsUrl
          );
        }
        sessionStorage.setItem(
          SESSION_STORAGE_KEYS.USER_NAME,
          signInState.username
        );
        sessionStorage.setItem(
          SESSION_STORAGE_KEYS.TENANT_ID,
          token[SESSION_STORAGE_KEYS.TENANT_ID]
        );
        sessionStorage.setItem(SESSION_STORAGE_KEYS.TOKEN, token.accessToken);
        if (history.isFirstPage) {
          history.replace('/');
        } else {
          history.go(-1);
        }

        yield put({
          type: 'global/initWebSocket',
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            showErr: true,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {},
};
