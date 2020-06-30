import {login} from './service';
import {SESSION_STORAGE_KEYS} from "@/config/constants";
import {history} from "@router/index";

export default {
    namespace: "signIn",
    state: {
        username: '',
        password: '',
        showErr: false
    },
    effects: {
        * login (_, { call, put, select }) {
            const state = yield select(state => ({
                ...state['signIn']
            }));
            const {data, ok} = yield call(login, {...state});
            if (ok) {
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
                    type: 'global/initWebSocket'
                });
            } else {
                yield put({
                    type: 'save',
                    payload: {
                        showErr: true
                    }
                });
            }
        }
    },
    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        }
    },
    subscriptions: {}
}