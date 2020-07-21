import { post } from '@utils/http';
import { encrypt } from '@utils/str';

export const login = (params) => {
  return post('api/link-service/v1/service/oauth/gettoken', {
    visitorId: encodeURI(encrypt(params.username)),
    visitorType: 'USER',
    flag: 'WEB',
    pwd: encodeURI(encrypt(params.password)),
    type: '1',
  }).then(({ ok, data }) => {
    if (ok) {
      return {
        ok,
        data: JSON.parse(data.result.data),
      };
    }
    return {
      ok,
      data: data.result.msg,
    };
  });
};
