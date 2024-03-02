import { axiosPrivate } from '@/api/axios/interceptors';

//임시 사용자 정보를 가져옵니다.
export const getTemporaryUserInfo = async () => {
  try {
    const response = await axiosPrivate.get('/user/register/users/me');
    return response.data.data;
  } catch (error) {
    console.error('Failed to get temporary user info:', error);
    throw new Error('Failed to get temporary user info');
  }
};

//닉네임 중복 확인
export const getCheckDuplicatedNickname = async (nickname: string) => {
  try {
    const response = await axiosPrivate.get(`/user/register/users/${nickname}/is-duplicated`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to check nickname:', error);
    throw new Error('Failed to check nickname');
  }
};
