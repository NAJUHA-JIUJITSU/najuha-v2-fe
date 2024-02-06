'use client';
import styles from './index.module.scss';
import ButtonSns from '@/components/common/buttonSns';

export default function LoginSns() {
  return (
    <div className={styles.login}>
      <ButtonSns snsProvider="KAKAO" />
      <ButtonSns snsProvider="NAVER" />
      <ButtonSns snsProvider="GOOGLE" />
    </div>
  );
}
