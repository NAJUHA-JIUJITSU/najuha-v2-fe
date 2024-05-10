import { axiosPrivate } from '@/api/axios/interceptors';

interface patchUserProps {
  name: string;
  nickname: string;
  gender: string | undefined;
  belt: string;
  birth: string;
}

//회원정보 수정
const patchUser = async (data: patchUserProps) => {
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
