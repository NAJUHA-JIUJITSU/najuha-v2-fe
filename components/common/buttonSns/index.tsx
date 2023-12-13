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
  },
  naver: {
    logo: <NaverLogo />,
    buttonText: '네이버로 계속하기',
  },
  apple: {
    logo: <AppleLogo />,
    buttonText: 'Apple로 계속하기',
  },
};

export default function ButtonSns({ snsProvider }: Props) {
  const { logo, buttonText } = snsInfo[snsProvider];

  return (
    <button className={`${styles.button} ${styles[snsProvider]}`}>
      {logo}
      <div>{buttonText}</div>
    </button>
  );
}
