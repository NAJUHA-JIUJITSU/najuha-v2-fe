import { axiosPrivate, axiosPublic } from '@/api/axios/interceptors';
import { saveTokens } from '@/utils/tokenManagement';

//임시 사용자 정보를 가져옵니다.
const getTemporaryUserInfo = async () => {
  const response = await axiosPrivate.get('/user/register/users/me');
  return response;
};

//닉네임 중복 확인
const getCheckDuplicatedNickname = async (nickname: string) => {
  const response = await axiosPrivate.get(`/user/register/users/${nickname}/is-duplicated`);
  return response;
};

//전화번호로 인증코드 전송
const postSendAuthCode = async (phoneNumber: string) => {
  const response = await axiosPrivate.post('/user/register/phone-number/auth-code', {
    phoneNumber: phoneNumber,
  });
  return response;
};

//전화번호 인증코드 확인
const postConfirmAuthCode = async (authCode: string) => {
  const response = await axiosPrivate.post('/user/register/phone-number/auth-code/confirm', {
    authCode: authCode,
  });
  return response;
};

//회원가입
const patchRegister = async (data: any) => {
  // const response = await axiosPrivate.patch('/user/register', data);
  // return response;
  const response = await axiosPrivate.patch('/user/register', data);
  return response;
};

export const registerApi = {
  getTemporaryUserInfo,
  getCheckDuplicatedNickname,
  postSendAuthCode,
  postConfirmAuthCode,
  patchRegister,
};
