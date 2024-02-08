'use client';

import KakaoLogo from '@/public/svgs/kakaoLogo.svg';
import NaverLogo from '@/public/svgs/naverLogo.svg';
// import GoogleLogo from '@/public/svgs/googleLogo.svg';
import AppleLogo from '@/public/svgs/appleLogo.svg';
import styles from './index.module.scss';

type snsProvider = 'kakao' | 'naver' | 'google' | 'apple';

interface Props {
  snsProvider: snsProvider;
}

const NAJUHA_FE_ENDPOINT = process.env.NEXT_PUBLIC_NAJUHA_FE_URL;
const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// TODO: state 추가?
const snsProviderList = {
  kakao: {
    logo: <KakaoLogo />,
    buttonText: '카카오로 계속하기',
    oauthUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${NAJUHA_FE_ENDPOINT}/oauth/callback/kakao&response_type=code`,
  },
  naver: {
    logo: <NaverLogo />,
    buttonText: '네이버로 계속하기',
    oauthUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAJUHA_FE_ENDPOINT}/oauth/callback/naver`,
  },
  google: {
    logo: <div>G</div>, //TODO: Google 로고로 변경
    buttonText: 'Google로 계속하기',
    oauthUrl: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${NAJUHA_FE_ENDPOINT}/oauth/callback/google&scope=profile email&access_type=offline`,
  },
  apple: {
    logo: <AppleLogo />,
    buttonText: 'Apple로 계속하기',
    oauthUrl: `${NAJUHA_FE_ENDPOINT}/oauth/callback/apple`,
  },
};

export default function ButtonSns({ snsProvider }: Props) {
  const { logo, buttonText, oauthUrl } = snsProviderList[snsProvider];

  return (
    <button
      className={`${styles.button} ${styles[snsProvider]}`}
      onClick={() => window.location.assign(oauthUrl)}
    >
      {logo}
      <div>{buttonText}</div>
    </button>
  );
}
