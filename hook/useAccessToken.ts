import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '@/atom/accessTokenState';
import { saveRefreshToken, isTokenExpired } from '@/util/tokenManagement';
import { postRefreshToken } from '@/api/auth';
import Cookies from 'js-cookie';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const initAccessToken = async () => {
    const refreshToken = Cookies.get('refreshToken');

    // accessToken 또는 refreshToken이 만료되었거나 없는 경우 새로운 토큰을 요청합니다.
    if (
      !accessToken ||
      isTokenExpired(accessToken) ||
      !refreshToken ||
      isTokenExpired(refreshToken)
    ) {
      if (!refreshToken) {
        console.error('refreshToken이 존재하지 않거나 만료되었습니다.');
        return;
      }

      try {
        const tokens = await postRefreshToken(refreshToken);
        console.log('토큰 갱신 성공:', tokens);
        setAccessToken(tokens.data.accessToken); // 상태 업데이트
        saveRefreshToken(tokens.data.refreshToken); // 쿠키 저장
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    }
  };

  useEffect(() => {
    initAccessToken();
  }, [accessToken, setAccessToken]);

  return { accessToken, setAccessToken };
};
