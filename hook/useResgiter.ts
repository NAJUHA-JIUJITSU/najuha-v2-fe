import { useState } from 'react';
import { saveRefreshToken, decodeToken } from '@/util/tokenManagement';
import { patchRegister } from '@/api/register';
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
}

const useRegister = () => {
  const [registerState, setRegisterState] = useState<LoginState>({
    isLoading: false,
    error: null,
  });

  const { accessToken, setAccessToken } = useAccessToken();

  const handleRegister = async (funnelData: any) => {
    setRegisterState((prev) => ({ ...prev, isLoading: true }));
    try {
      //1. 쿠키에 저장되어있는 엑세스 토큰 찾기
      if (accessToken) {
        //2. 백엔드에 Register 요청
        console.log('accessToken: ', accessToken);
        const data = await patchRegister(funnelData, accessToken);

        // 받은 accessToken과 refreshToken을 쿠키에 저장
        setAccessToken(data.data.accessToken);
        saveRefreshToken(data.data.refreshToken);
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
