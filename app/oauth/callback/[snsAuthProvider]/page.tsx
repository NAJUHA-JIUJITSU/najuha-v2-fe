'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';
import { postSnsLogin } from '@/api/auth';

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
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleSnsLogin = async (snsAuthCode: string, snsAuthProvider: string) => {
    try {
      const data = await postSnsLogin(snsAuthCode, snsAuthProvider);
      setAccessToken(data.accessToken);
      console.log(data.accessToken);
      Cookies.set('refreshToken', data.refreshToken); // TODO: HttpOnly, Secure 설정

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
