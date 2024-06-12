import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { IUser } from '@/node_modules/najuha-v2-api/lib/modules/users/domain/interface/user.interface';

// 회원정보 수정
const patchUser = async (data: Partial<IUser>) => {
  console.log('회원정보 수정: ', data);
  const response = await withAuth((connection) =>
    api.functional.user.users.updateUser(connection, data),
  );
  return response.result;
};

// 사용자 정보 가져오기
const getUserInfo = async () => {
  const response = await withAuth((connection) => api.functional.user.users.me.getMe(connection));
  return response.result.user;
};

export const usersApi = {
  patchUser,
  getUserInfo,
};
