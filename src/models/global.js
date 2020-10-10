import menus from '@/config/menus.config';
import { LOCAL_STORAGE_KEYS, SESSION_STORAGE_KEYS } from '@/config/constants';
import { history } from '@router/index';
import { logout, getTenants } from '@services/global';
import { isLogin } from '@utils/permission';
import moment from 'moment';
import { encrypt, GenSeqNo16 } from '@utils/str';
import { session } from '@utils/session';
import { Socket } from '@utils/http';
import { languages } from '@locales';

export default {
  namespace: 'global',
  state: {
    siderCollapsed: JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ASIDE_NAV_COLLAPSED) || 'false'
    ),
    tenants: [],
    selectTenant: null,
    navMenus: menus,
    locales: languages,
    socketService: null,
    endId: GenSeqNo16(),
  },
  effects: {
    *logout(_, { call, put, select }) {
      const socketService = yield select((state) => state.global.socketService);
      const { ok } = yield call(logout);
      if (ok) {
        session.clear();
        history.replace('/');
        // 关闭socket
        if (socketService.clearHeartBeat) {
          // 停止计时器
          socketService.clearHeartBeat();
          // 断开连接
          socketService.close();
        }
        yield put({
          type: 'save',
          payload: {
            socketService: null,
          },
        });
      }
    },
    *getTenants(_, { call, put }) {
      // 此函数在登录成功后调用，
      const UserInfo = session.get(SESSION_STORAGE_KEYS.USER_INFO);
      if (UserInfo.user.userName === 'root') {
        const { ok, data } = yield call(getTenants);
        if (ok) {
          yield put({
            type: 'save',
            payload: {
              tenants: data,
            },
          });
        }
        return;
      }
      yield put({
        type: 'save',
        payload: {
          tenants: [UserInfo.tenant],
        },
      });
    },
  },
  reducers: {
    setSelectTenant(state, { payload }) {
      session.set(SESSION_STORAGE_KEYS.TENANT_ID, payload);
      return {
        ...state,
        selectTenant: payload,
      };
    },
    siderTrigger(state) {
      const { siderCollapsed } = state;
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ASIDE_NAV_COLLAPSED,
        `${!siderCollapsed}`
      );
      return {
        ...state,
        siderCollapsed: !siderCollapsed,
      };
    },
    onSelectLocale(state, { payload }) {
      location.replace(
        payload ? `?lang=${payload}${location.hash}` : location.hash
      );
      return state;
    },
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    initWebSocket(state) {
      if (state.socketService) {
        return state;
      }
      // 登录后连接socket, 否则不创建socket
      if (isLogin()) {
        const socketService = new Socket(
          session.get(SESSION_STORAGE_KEYS.SOCKET_URL)
        );
        const newState = {
          ...state,
          socketService,
        };

        const buildHeartBeatMessage = () => {
          const now = moment().format('yyyy-MM-dd HH:mm:ss');
          const tenantId = session.get(SESSION_STORAGE_KEYS.TENANT_ID);
          const token = session.get(SESSION_STORAGE_KEYS.TOKEN);
          const userName = session.get(SESSION_STORAGE_KEYS.USER_NAME);
          const heartBeanMessage = {
            tenantId: tenantId,
            userName: userName,
            componentType: '-',
            componentInstanceId: '-',
            sender: userName,
            receiver: '-',
            msgId: GenSeqNo16(),
            msgType: 'LINK_APP_DATA_REQ_MESSAGE',
            contentJson: { contentType: '0', link: '', body: [] },
            title: '',
            createTime: now,
          };

          const message = {
            flag: 'ZM',
            msgId: GenSeqNo16(),
            msgType: 'LINK_APP_DATA_REQ_MESSAGE',
            key: state.endId,
            jsonData: JSON.stringify(heartBeanMessage),
            authorization: null,
          };

          const auth = {
            token: token,
            userName: userName,
            tenantId: tenantId,
          };
          message.authorization = encrypt(JSON.stringify(auth));

          return message;
        };
        const buildMessage = (subMessages) => {
          const now = moment().format('yyyy-MM-dd HH:mm:ss');
          const tenantId = session.get(SESSION_STORAGE_KEYS.TENANT_ID);
          const token = session.get(SESSION_STORAGE_KEYS.TOKEN);
          const userName = session.get(SESSION_STORAGE_KEYS.USER_NAME);

          const jsonMessage = {
            sender: userName,
            msgType: 'TOPIC_SUBSCRIBE_MESSAGE',
            contentJson: subMessages,
            createTime: now,
          };

          const message = {
            flag: 'ZM',
            msgId: GenSeqNo16(),
            msgType: 'LINK_CONFIG_MESSAGE',
            key: state.endId,
            jsonData: JSON.stringify(jsonMessage),
            authorization: null,
          };

          const auth = {
            token: token,
            userName: userName,
            tenantId: tenantId,
          };
          message.authorization = encrypt(JSON.stringify(auth));
          return message;
        };
        // 防止超时断开

        socketService.on('open', () => {
          // 注册监听
          const userName = session.get(SESSION_STORAGE_KEYS.USER_NAME);
          const topic = {};
          topic[userName] = [
            'LINK.DEVICE.ALARM.MESSAGE',
            'MICRO.SERVICE.ALARM.MESSAGE',
            'LINK.VEHICLE.GPS.MESSAGE',
          ];
          const topics = [topic];
          socketService.send(buildMessage(topics));
          socketService.keepAlive(buildHeartBeatMessage, 60000);
        });
        socketService.on('message', (event) => {
          console.log('websocket message:', JSON.parse(event.data));
        });

        return newState;
      }
      return state;
    },
  },
  subscriptions: {},
};
