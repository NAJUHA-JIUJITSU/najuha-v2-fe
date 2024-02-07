'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import snsLogin from '@/api/auth/snsLogin';

type snsAuthProvider = 'kakao' | 'naver' | 'google' | 'apple';

const snsAuthProviderList = {
  kakao: 'KAKAO',
  naver: 'NAVER',
  google: 'GOOGLE',
  apple: 'APPLE',
};

export default function OauthCallbackPage({
  params,
}: {
  params: { snsAuthProvider: snsAuthProvider };
}) {
  const router = useRouter();

  const handleSnsLogin = async (snsAuthCode: string, snsAuthProvider: string) => {
    try {
      const data = await snsLogin(snsAuthCode, snsAuthProvider);
      Cookies.set('accessTokens', data.accessToken);
      Cookies.set('refreshToken', data.refreshToken);

      const decodedToken = JSON.parse(atob(data.accessToken.split('.')[1]));
      if (decodedToken.userRole === 'TEMPORARY_USER') router.push('/register');
      else router.push('/home');
    } catch (error) {
      alert('로그인에 실패했습니다.');
      console.error(error);
      router.push('/login');
    }
  };

  useEffect(() => {
    const snsAuthCode = new URLSearchParams(window.location.search).get('code');
    const snsProvider = snsAuthProviderList[params.snsAuthProvider];
    if (!snsAuthCode) {
      alert('snsAuthCode가 없습니다.');
      router.push('/login');
    } else {
      handleSnsLogin(snsAuthCode, snsProvider);
    }
  });

  return;
}
