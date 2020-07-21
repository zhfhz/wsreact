import { getData } from './service';

export default {
  namespace: 'pingUseRate',
  state: {
    viewData: null,
  },
  effects: {
    *getViewData({ payload }, { put, call }) {
      const { data, ok } = yield call(getData, { ...payload });
      if (ok) {
        yield put({
          type: 'save',
          payload: data,
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        viewData: {
          ...payload,
        },
      };
    },
  },
  subscribe: {},
};
