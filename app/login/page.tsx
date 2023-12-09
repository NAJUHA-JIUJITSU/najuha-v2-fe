import FullLogo from '../../public/svgs/fullLogo.svg';
import KakaoLogo from '../../public/svgs/kakaoLogo.svg';
import NaverLogo from '../../public/svgs/naverLogo.svg';
import AppleLogo from '../../public/svgs/appleLogo.svg';
import styles from './index.module.scss';

// backgroundImage
// NAJUHA_나는주짓수가하고싶다 logo
// 지금바로 주짓수의 모든 정보를 한눈에 확인해보세요 // snsLoginButtons
// footer

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <FullLogo />
      </div>
      <div>
        <div className={styles.info}>
          <h1>
            지금 바로 <span>주짓수</span>의 모든 정보를 <span>한눈에</span> 확인해보세요
          </h1>
        </div>
        <div className={styles.login}>
          <button className={styles.kakaoLoginButton}>
            <KakaoLogo />
            <div>카카오로 계속하기</div>
          </button>
          <button className={styles.NaverLoginButton}>
            <NaverLogo />
            네이버로 계속하기
          </button>
          <button className={styles.AppleLoginButton}>
            <AppleLogo />
            Apple로 계속하기
          </button>
        </div>
        <div className={styles.bottom}>
          {/* //TODO : bottom 마무리 해야함 */}
          <button>둘러보기</button>
          <button>문의하기</button>
        </div>
      </div>
    </div>
  );
}
