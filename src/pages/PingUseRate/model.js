import { get } from '@utils/http';

export default {
    namespace: "pingUseRate",
    state: {
        viewData: null,
    },
    effects: {
        * getViewData({ payload }, { put }) {
            const response = yield get('api/operation-service/v1/data/metric/queryliquidfillingall', { params: { ...payload }});
            if (response) {
                yield put({
                    type: 'save',
                    payload: response
                })
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