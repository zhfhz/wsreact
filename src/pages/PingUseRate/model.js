import { getData } from './service';

export default {
    namespace: "pingUseRate",
    state: {
        viewData: null,
    },
    effects: {
        * getViewData({ payload }, { put, call }) {
            const response = yield call(getData, {...payload});
            if (response) {
                yield put({
                    type: 'save',
                    payload: response
                });
            }
        }
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                viewData: {
                    ...payload
                }
            }
        }
    },
    subscribe: {

    }
}