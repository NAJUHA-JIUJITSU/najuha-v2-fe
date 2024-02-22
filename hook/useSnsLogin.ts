import { useState } from 'react';
import { postSnsLogin } from '@/api/auth';
import { saveRefreshToken, decodeToken } from '@/util/tokenManagement';
import { useAccessToken } from '@/hook/useAccessToken';

interface MyTokenPayload {
  userId: number;
  userRole: string;
  iat: number;
  exp: number;
}

interface LoginState {
  isLoading: boolean;
  error: string | null;
  payload: MyTokenPayload | null;
}

const useSnsLogin = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    error: null,
    payload: null,
  });

  const { setAccessToken } = useAccessToken();

  const handleSnsLogin = async (snsAuthProvider: string, snsAuthCode: string) => {
    setLoginState((prev) => ({ ...prev, isLoading: true }));
    try {
      //백엔드에 snsLogin Post 요청
      const data = await postSnsLogin(snsAuthProvider, snsAuthCode);

      // accessToken는 전역변수에, refreshToken은 쿠키에 저장
      setAccessToken(data.data.accessToken);
      saveRefreshToken(data.data.refreshToken);

      const decodedToken = decodeToken(data.data.accessToken);

      setLoginState({
        isLoading: false,
        error: null,
        payload: decodedToken,
      });
    } catch (error) {
      setLoginState({
        isLoading: false,
        error: error instanceof Error ? error.message : String(error),
        payload: null,
      });
    }
  };

  return { ...loginState, handleSnsLogin };
};

export default useSnsLogin;
