'use client';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import RegisterInfo from '@/components/register/registerInfo';
import RegisterForm from '@/components/register/registerForm';
import Header from '@/components/common/header/Header';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import useCheckboxState from '@/hook/useCheckbox';
import { useState } from 'react';

export default function Gender() {
  const [gender, setGender] = useState<string | null>('male');

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'회원가입'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <RadioButtonLabel
        msg={'남성'}
        isChecked={gender === 'male'}
        changeCheck={() => setGender('male')}
      />
      <RadioButtonLabel
        msg={'여성'}
        isChecked={gender === 'female'}
        changeCheck={() => setGender('female')}
      />
    </div>
  );
}
