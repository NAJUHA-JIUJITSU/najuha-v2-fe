// hooks/useAccessToken.js
import { useRecoilState } from 'recoil';
import { accessTokenState } from '@/states/authState';

// Hook의 반환 타입을 명시적으로 정의
interface UseAccessToken {
  accessToken: string | null;
  updateAccessToken: (newToken: string) => void;
}

export function useAccessToken(): UseAccessToken {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const updateAccessToken = (newToken: string) => {
    setAccessToken(newToken);
  };

  return { accessToken, updateAccessToken };
}
