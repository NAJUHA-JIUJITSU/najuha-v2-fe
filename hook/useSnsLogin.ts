import { useState } from 'react';
import { postSnsLogin } from '@/api/authService';
import { decodeToken } from '@/util/tokenManagement';

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

  const handleSnsLogin = async (snsAuthProvider: string, snsAuthCode: string) => {
    setLoginState((prev) => ({ ...prev, isLoading: true }));
    try {
      //백엔드에 snsLogin Post 요청
      const data = await postSnsLogin(snsAuthProvider, snsAuthCode);

      const decodedToken = decodeToken(data.accessToken);

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
