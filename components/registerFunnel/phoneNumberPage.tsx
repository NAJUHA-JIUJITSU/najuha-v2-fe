'use client';
import Input from '../common/input';
import styles from './index.module.scss';
import ButtonOnClick from '../common/button/buttonOnClick';
import React from 'react';
import usePhoneNumberValidation from '@/hook/usePhoneNumberValidation';
import { useSendAuthCode } from '@/hook/useRegister';

interface PhoneNumberPageProps {
  onNext: (data: string) => void;
  data: string;
}

export default function phoneNumberPage({ onNext, data }: PhoneNumberPageProps) {
  const { number, setNumber, isValid, errorMessage } = usePhoneNumberValidation(data);
  const { mutate: sendAuthCode, isPending } = useSendAuthCode();

  const handleButtonClick = () => {
    sendAuthCode(number, {
      onSuccess: (code) => {
        console.log('인증코드 전송 성공: ', code);
        onNext(number);
      },
      onError: (error) => {
        console.log('인증코드 전송 실패: ', error);
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* 휴대폰 번호 입력 */}
      <Input
        label="휴대폰 번호를 입력해주세요"
        placeholder="010-1234-5678"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        errMsg={errorMessage}
        disabled={isPending}
      />

      {/* 다음 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="인증번호 받기"
          color={isValid ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => handleButtonClick()}
        />
      </div>
    </div>
  );
}
