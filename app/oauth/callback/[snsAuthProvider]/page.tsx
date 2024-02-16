'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';
import { postSnsLogin } from '@/api/auth';
import { decodeJwtToken } from '@/utils/decoteJwtToken';

type snsAuthProvider = 'kakao' | 'naver' | 'google' | 'apple';

const snsAuthProviderList = {
  kakao: 'KAKAO',
  naver: 'NAVER',
  google: 'GOOGLE',
  apple: 'APPLE',
};

interface Props {
  params: {
    snsAuthProvider: snsAuthProvider;
  };
}

const OauthCallbackPage = ({ params }: Props) => {
  const router = useRouter();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  useEffect(() => {
    const snsAuthCode = new URLSearchParams(window.location.search).get('code');
    const snsProvider = snsAuthProviderList[params.snsAuthProvider];

    const handleSnsLogin = async () => {
      if (!snsAuthCode) {
        alert('snsAuthCode가 없습니다.');
        router.push('/login');
        return;
      }

      try {
        const data = await postSnsLogin(snsAuthCode, snsProvider);
        console.log(data.accessToken);
        setAccessToken(data.accessToken);
        Cookies.set('refreshToken', data.refreshToken); //TODO: httpOnly 쿠키로 변경

        const decodedToken = decodeJwtToken(data.accessToken);
        const destination = decodedToken.userRole === 'TEMPORARY_USER' ? '/register' : '/home';
        router.push(destination);
      } catch (error) {
        alert('로그인에 실패했습니다.');
        console.error(error);
        router.push('/login');
      }
    };

    handleSnsLogin();
  }, [params.snsAuthProvider, router, setAccessToken]);

  return null;
};

export default OauthCallbackPage;
