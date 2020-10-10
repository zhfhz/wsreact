import { post, get } from '@utils/http';
import { SESSION_STORAGE_KEYS } from '@/config/constants';
import { session } from '@utils/session';

export const logout = () => {
  const username = session.get(SESSION_STORAGE_KEYS.USER_NAME);
  return post('api/user-service/v1/service/user/logout', {
    userName: username,
  }).then((response) => {
    return response;
  });
};

export const getTenants = () => {
  return get('api/user-service/v1/service/tenant/queryall').then(function ({
    ok,
    data,
  }) {
    if (ok && data.tenants && data.tenants.length > 0) {
      const tenants = data.tenants.map((item) => ({
        tenantName: item.tenantName,
        tenantId: item.tenantId,
      }));
      return {
        ok,
        data: tenants,
      };
    }
  });
};
