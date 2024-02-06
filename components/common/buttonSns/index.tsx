import KakaoLogo from '@/public/svgs/kakaoLogo.svg';
import NaverLogo from '@/public/svgs/naverLogo.svg';
import AppleLogo from '@/public/svgs/appleLogo.svg';
import styles from './index.module.scss';

interface Props {
  snsProvider: 'KAKAO' | 'NAVER' | 'GOOGLE';
}

const snsConfig = {
  NAVER: {
    logo: <NaverLogo />,
    buttonText: '네이버로 계속하기',
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI,
    loginUrl: 'https://nid.naver.com/oauth2.0/authorize',
    scope: '',
    responseType: 'code',
  },
  KAKAO: {
    logo: <KakaoLogo />,
    buttonText: '카카오로 계속하기',
    clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    loginUrl: 'https://kauth.kakao.com/oauth/authorize',
    scope: '',
    responseType: 'code',
  },
  GOOGLE: {
    logo: <AppleLogo />,
    buttonText: 'Google로 계속하기(일단 구글 로그인임)',
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    redirectUri: 'http://localhost:3000/oauth',
    loginUrl: 'https://accounts.google.com/o/oauth2/auth',
    scope: 'openid profile email',
    responseType: 'code',
  },
};

export default function ButtonSns({ snsProvider }: Props) {
  const { logo, buttonText, clientId, redirectUri, loginUrl, scope, responseType } =
    snsConfig[snsProvider];

  const handleLogin = () => {
    // SNS 로그인 URL을 생성합니다.
    window.location.href = `${loginUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;
  };

  return (
    <button className={`${styles.button} ${styles[snsProvider]}`} onClick={handleLogin}>
      {logo}
      <div>{buttonText}</div>
    </button>
  );
}
