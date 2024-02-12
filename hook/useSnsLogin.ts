import { useState } from 'react';
import { decodeToken } from '@/util/decodeToken';
import { postSnsLogin } from '@/api/auth';
import Cookies from 'js-cookie';

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

// 토큰을 쿠키에 저장하는 함수
const setTokenCookie = (tokenName: string, tokenValue: string) => {
  const decoded: MyTokenPayload | null = decodeToken(tokenValue);
  if (decoded === null) {
    // 오류 처리 로직, 예를 들어 상태 업데이트 또는 예외 발생
    throw new Error('Token decoding failed.');
  } else {
    const expires = new Date(decoded.exp * 1000); // 토큰의 만료 시간을 쿠키의 만료 시간으로 설정
    Cookies.set(tokenName, tokenValue, { expires });
  }
};

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

      // accessToken과 refreshToken을 쿠키에 저장
      setTokenCookie('accessToken', data.data.accessToken);
      setTokenCookie('refreshToken', data.data.refreshToken);

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
