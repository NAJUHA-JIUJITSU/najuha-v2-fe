'use client';
import KakaoLogo from '@/public/svgs/kakaoLogo.svg';
import NaverLogo from '@/public/svgs/naverLogo.svg';
import AppleLogo from '@/public/svgs/appleLogo.svg';
import styles from './index.module.scss';

type snsProvider = 'kakao' | 'naver' | 'apple';

interface Props {
  snsProvider: snsProvider;
}

const snsInfo = {
  kakao: {
    logo: <KakaoLogo />,
    buttonText: '카카오로 계속하기',
    authURL: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=KAKAO`,
  },
  naver: {
    logo: <NaverLogo />,
    buttonText: '네이버로 계속하기',
    authURL: `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&response_type=code&state=NAVER`,
  },
  apple: {
    logo: <AppleLogo />,
    buttonText: 'Apple로 계속하기',
    authURL: `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile openid&response_type=code&state=GOOGLE&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
  },
};

export default function ButtonSns({ snsProvider }: Props) {
  const { logo, buttonText, authURL } = snsInfo[snsProvider];

  const redirectToExternalAuth = (url: string) => {
    window.location.href = url;
  };

  return (
    <button
      className={`${styles.button} ${styles[snsProvider]}`}
      onClick={() => redirectToExternalAuth(authURL)}
    >
      {logo}
      <div>{buttonText}</div>
    </button>
  );
}
