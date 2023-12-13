import styles from './index.module.scss';
import LoginSns from '@/components/login/loginSns';
import LoginInfo from '@/components/login/loginInfo';
import LoginLogo from '@/components/login/loginLogo';
import LoginFooter from '@/components/login/loginFooter';

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginLogo />
      <LoginInfo />
      <LoginSns />
      <LoginFooter />
    </div>
  );
}
