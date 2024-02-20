import { useState } from 'react';
import { decodeToken } from '@/util/decodeToken';
import { patchRegister } from '@/api/register';
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
}

// 토큰을 쿠키에 저장하는 함수
const setTokenCookie = (tokenName: string, tokenValue: string) => {
  const decoded: MyTokenPayload | null = decodeToken(tokenValue);
  if (decoded === null) {
    // 오류 처리 로직, 예를 들어 상태 업데이트 또는 예외 발생
    throw new Error('Token decoding failed.');
  } else {
    const expires = new Date(decoded.exp * 1000); // 토큰의 만료 시간을 쿠키의 만료 시간으로 설정
    Cookies.set(tokenName, tokenValue, { expires, secure: true, httpOnly: true }); //todo: 쿠키 보안설정 추가
  }
};

const useRegister = () => {
  const [registerState, setRegisterState] = useState<LoginState>({
    isLoading: false,
    error: null,
  });

  const handleRegister = async (funnelData: any) => {
    setRegisterState((prev) => ({ ...prev, isLoading: true }));
    try {
      //1. 쿠키에 저장되어있는 엑세스 토큰 찾기
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        //2. 백엔드에 Register 요청
        console.log('accessToken: ', accessToken);
        const data = await patchRegister(funnelData, accessToken);

        // 받은 accessToken과 refreshToken을 쿠키에 저장
        setTokenCookie('accessToken', data.data.accessToken);
        setTokenCookie('refreshToken', data.data.refreshToken);
      } else {
        throw new Error('No access token found in cookies.');
      }

      setRegisterState({
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setRegisterState({
        isLoading: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return { ...registerState, handleRegister };
};

export default useRegister;
