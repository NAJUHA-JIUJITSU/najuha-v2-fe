import { axiosPrivate } from '@/api/axios/interceptors';
import { saveTokens } from '@/util/tokenManagement';

//임시 사용자 정보를 가져옵니다.
const getTemporaryUserInfo = async () => {
  try {
    const response = await axiosPrivate.get('/user/register/users/me');
    return response.data.result;
  } catch (error) {
    console.error('Failed to get temporary user info:', error);
    throw new Error('Failed to get temporary user info');
  }
};

//닉네임 중복 확인
const getCheckDuplicatedNickname = async (nickname: string) => {
  try {
    const response = await axiosPrivate.get(`/user/register/users/${nickname}/is-duplicated`);
    return response.data.result;
  } catch (error) {
    console.error('Failed to check nickname:', error);
    throw new Error('Failed to check nickname');
  }
};

//전화번호로 인증코드 전송
const postSendAuthCode = async (phoneNumber: string) => {
  try {
    const response = await axiosPrivate.post('/user/register/phone-number/auth-code', {
      phoneNumber: phoneNumber,
    });
    return response.data.result;
  } catch (error) {
    console.error('Failed to send auth code:', error);
    throw new Error('Failed to send auth code');
  }
};

//전화번호 인증코드 확인
const postConfirmAuthCode = async (authCode: string) => {
  try {
    const response = await axiosPrivate.post('/user/register/phone-number/auth-code/confirm', {
      authCode: authCode,
    });
    return response.data.result;
  } catch (error) {
    console.error('Failed to check auth code:', error);
    throw new Error('Failed to check auth code');
  }
};

//회원가입
const patchRegister = async (data: any) => {
  try {
    const response = await axiosPrivate.patch('/user/register', data);

    const { accessToken, refreshToken } = response.data.result;
    saveTokens(accessToken, refreshToken);

    return response.data.result;
  } catch (error) {
    console.error('Failed to register:', error);
    throw new Error('Failed to register');
  }
};

export const registerApi = {
  getTemporaryUserInfo,
  getCheckDuplicatedNickname,
  postSendAuthCode,
  postConfirmAuthCode,
  patchRegister,
};
