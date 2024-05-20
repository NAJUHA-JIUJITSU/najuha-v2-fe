import { axiosPrivate } from '@/api/axios/interceptors';

interface patchUserProps {
  nickname?: string;
  gender?: string;
  belt?: string;
  birth?: string;
}

//회원정보 수정
const patchUser = async (data: patchUserProps) => {
  console.log('회원정보 수정: ', data);
  const response = await axiosPrivate.patch('/user/users', data);
  return response;
};

const getUserInfo = async () => {
  const response = await axiosPrivate.get('/user/users/me');
  return response;
};

export const usersApi = {
  patchUser,
  getUserInfo,
};
