import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const login = () => {
    router.push('/login');
  };

  const logout = () => {
    const confirmLogout = confirm(
      '작성 중인 정보가 있다면 모두 사라지며 홈으로 돌아가게 됩니다. 정말로 로그아웃 하시겠습니까?',
    );
    if (confirmLogout) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setIsLogin(false);
      window.location.href = '/'; //todo: 로그아웃 최적화 필요
    }
  };

  return { isLogin, logout, login };
}
