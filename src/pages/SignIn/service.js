import { post } from '@utils/http';
import { encrypt } from '@utils';

export const login = (params) => {
    return post('api/link-service/v1/service/oauth/gettoken',{
        visitorId: encodeURI(encrypt(params.username)) ,
        visitorType: 'USER',
        flag: 'WEB',
        pwd: encodeURI(encrypt(params.password)),
        type: '1'
    }).then(response => {
        if (response.result.code === 0) {
            let data;
            data = JSON.parse(response.result.data);
            return data;
        }
        return null;
    });
};
