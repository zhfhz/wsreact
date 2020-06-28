import { login } from './service';
import {SESSION_STORAGE_KEYS} from "@/config/constants";
import { history } from "@router/index";

export default {
    namespace: "signIn",
    state: {
        username: '',
        password: ''
    },
    effects: {
        * login (_, { call, put, select }) {
            const state = yield select(state => ({
                ...state['signIn']
            }));
            const data = yield call(login, {...state});
            if (data) {
                const token = data.token;
                if (data["serverUrl"] != null && data["serverUrl"]["wsUrl"] != null) {
                    sessionStorage.setItem(SESSION_STORAGE_KEYS.SOCKET_URL, data["serverUrl"]["wsUrl"]);
                }
                sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_NAME, state.username);
                sessionStorage.setItem(SESSION_STORAGE_KEYS.TENANT_ID, token[SESSION_STORAGE_KEYS.TENANT_ID]);
                sessionStorage.setItem(SESSION_STORAGE_KEYS.TOKEN, token.accessToken);
                if (history.isFirstPage) {
                    history.replace('/');
                } else {
                    history.go(-1);
                }

                yield put({
                    type: 'global/openSocketListener'
                });
            }
        }
    },
    reducers: {
        saveState(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    subscriptions: {}
}