'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import RegisterInfo from '@/components/register/registerInfo';
import RegisterForm from '@/components/register/registerForm';

export default function Register() {
  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'회원가입'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <RegisterInfo />
      <RegisterForm />
    </div>
  );
}
