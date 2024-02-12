'use client';
import Input from '../common/input';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '../common/button/buttonOnClick';
import InfoMessage from '../common/infoMessage';
import React from 'react';
import useNicknameValidation from '@/hook/useNicknameValidation';
import usePhoneNumberValidation from '@/hook/usePhoneNumberValidation';

interface PhoneNumberPageProps {
  onNext: (data: string) => void;
  data: string;
}

export default function phoneNumberPage({ onNext, data }: PhoneNumberPageProps) {
  const { number, setNumber, isValid, errorMessage } = usePhoneNumberValidation(data);

  return (
    <div className={styles.wrapper}>
      {/* 닉네임 입력 */}
      <Input
        label="휴대폰 번호를 입력해주세요"
        placeholder="010-1234-5678"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        errMsg={errorMessage}
        // disabled={isLoading} todo: isLoading true일때 비활성화 되게 하기
      />

      {/* 다음 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={isValid ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => onNext(number)}
        />
      </div>
    </div>
  );
}
