import { axiosPublic } from '@/api/axios/axiosInstances.ts';
import { saveTokens } from '@/utils/tokenManagement';
import Cookies from 'js-cookie';
import { decodeToken } from '@/utils/tokenManagement';

// 소셜 로그인
export const postSnsLogin = async (snsAuthProvider: string, snsAuthCode: string) => {
  const response = await axiosPublic.post('/user/auth/sns-login', {
    snsAuthProvider,
    snsAuthCode,
  });
  const { accessToken, refreshToken } = response.data.result;
  saveTokens(accessToken, refreshToken);

  let payload = decodeToken(accessToken);
  return payload;
};

// 리프레시 토큰을 사용하여 엑세스 토큰 갱신
export const postRefreshToken = async (): Promise<string> => {
  //쿠기에서 리프레시 토큰 가져오기
  const response = await axiosPublic.post('/user/auth/token', {
    refreshToken: Cookies.get('refreshToken'),
  });
  const { accessToken, refreshToken } = response.data.result;
  saveTokens(accessToken, refreshToken);
  return accessToken;
};

export const authApi = {
  postSnsLogin,
  postRefreshToken,
};
