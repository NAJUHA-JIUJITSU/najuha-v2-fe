import { useRecoilState } from 'recoil';
import { accessTokenState } from '@/atom/accessTokenState';
import { postRefreshToken } from '@/api/auth';
import { saveRefreshToken } from '@/util/tokenManagement';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const refreshToken = Cookies.get('refreshToken');

  const refreshAccessToken = async () => {
    if (!accessToken) return;
    try {
      if (!refreshToken) throw new Error('No refresh token');
      console.log('refreshToken:', refreshToken);
      const response = await postRefreshToken(refreshToken);
      console.log('response:', response);
      if (!response.ok) throw new Error('Failed to refresh token');

      const data = await response.json();

      setAccessToken(data.data.accessToken);
      saveRefreshToken(data.data.refreshToken);

      return data.data.accessToken;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      setAccessToken('');
      //todo: 로그인 페이지로 이동, 로그아웃 처리
    }
  };

  return { refreshAccessToken };
};
