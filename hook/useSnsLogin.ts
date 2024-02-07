import { useState } from 'react';
import { decodeToken } from '@/util/decodeToken';
import { postSnsLogin } from '@/api/auth';

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
      const data = await postSnsLogin(snsAuthProvider, snsAuthCode);

      // const response = await fetch(`http://localhost:3001/auth/snsLogin`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ snsAuthProvider, snsAuthCode }),
      // });

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
