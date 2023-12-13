import styles from './index.module.scss';
import FullLogo from '@/public/svgs/fullLogo.svg';

export default function LoginLogo() {
  return (
    <div className={styles.top}>
      <FullLogo />
    </div>
  );
}
