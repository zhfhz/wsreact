import { get } from '@utils/http';

export const getData = params => {
    return get('api/operation-service/v1/data/metric/queryliquidfillingall', { params: { ...params }});
};
