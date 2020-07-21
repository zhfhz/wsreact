import { post } from '@utils/http';
import { SESSION_STORAGE_KEYS } from '@/config/constants';

export const logout = () => {
  const username = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_NAME);
  return post('api/user-service/v1/service/user/logout', {
    userName: username,
  }).then((response) => {
    return response;
  });
};
