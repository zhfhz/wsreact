import menus  from '@/config/menus.config';
import socket from 'socket.io-client';
import { SESSION_STORAGE_KEYS } from "@/config/constants";
import { history } from "@router/index";
import { logout } from "@services/global";

const SUPPOER_LOCALES = [
    {
        name: "Language",
        value: ""
    },
    {
        name: "English",
        value: "en-US"
    },
    {
        name: "繁體中文",
        value: "zh-TW"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    }
];

export default {
    namespace: "global",
    state: {
        siderCollapsed: false ,
        navMenus: menus,
        locales: SUPPOER_LOCALES,
        socketService: null,
    },
    effects: {
        *logout(_, { call }) {
            const data = yield call(logout);
            if (data) {
                sessionStorage.clear();
                history.replace('/');
            }
        }
    },
    reducers: {
        siderTrigger(state) {
            const { siderCollapsed } = state;
            localStorage.setItem('global_sider_collapsed', `${!siderCollapsed}`);
            return {
                ...state,
                siderCollapsed: !siderCollapsed
            };
        },
        onSelectLocale(state, { payload }) {
            location.search = payload ? `?lang=${payload}` : '';
            return state;
        },
        openSocketListener(state) {
            if (state.socketService) {
                return state;
            }
            const newState = {
                ...state,
                socketService: socket(sessionStorage.getItem(SESSION_STORAGE_KEYS.SOCKET_URL), {
                    transports: ['websocket']
                })
            };

            newState.socketService.on('connect', () => {
                console.log('socket has been connected!');
            });
            newState.socketService.on('disconnect', () => {
                console.log('socket has been disconnected!');
            });
            newState.socketService.on('error', (error) => {
                console.error(error)
            });
            return newState;
        },
        closeSocketListener(state) {
            if (state.socketService) {
                state.socketService.close();

                return {
                    ...state,
                    socketService: null
                };
            }

            return state;
        }
    },
    subscriptions: {}
}