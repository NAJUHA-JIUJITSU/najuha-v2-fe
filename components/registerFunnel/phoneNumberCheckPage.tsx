'use client';
import Input from '../common/input';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '../common/button/buttonOnClick';
import React from 'react';
import usePhoneNumberCodeValidation from '@/hook/usePhoneNumberCodeValidation';
import { useConfirmAuthCode, useSendAuthCode } from '@/hook/useRegister';

interface PhoneNumberCheckPageProps {
  onNext: (data: boolean) => void;
  data: string;
}

export default function phoneNumberCheckPage({
  onNext,
  data: phoneNumber,
}: PhoneNumberCheckPageProps) {
  const {
    code,
    setCode,
    isValid,
    errorMessage,
    setErrorMessage,
    isTimerActive,
    resetTimer,
    timeLeft,
  } = usePhoneNumberCodeValidation();
  const { mutate: confirmAuthCode, isPending } = useConfirmAuthCode();
  const { mutate: sendAuthCode } = useSendAuthCode(); //todo: isPending 사용해서 버튼 비활성화

  const handleButtonClick = () => {
    confirmAuthCode(code, {
      onSuccess: (response) => {
        if (response.data.result) {
          onNext(true);
        }
        setErrorMessage('인증코드가 일치하지 않습니다.');
      },
      onError: (error) => {
        console.log('인증코드 확인 실패: ', error);
      },
    });
  };

  const handleAgainButtonClick = () => {
    sendAuthCode(phoneNumber, {
      onSuccess: (response) => {
        console.log('인증코드 전송 성공: ', response.data.result);
        resetTimer();
      },
      onError: (error) => {
        console.log('인증코드 전송 실패: ', error);
      },
    });

    console.log('다시 받기 버튼 클릭');
  };

  return (
    <div className={styles.wrapper}>
      {/* 인증번호 번호 입력 */}
      <Input
        label="인증번호를 입력해주세요"
        placeholder="6자리 인증번호"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        errMsg={errorMessage}
        disabled={isPending}
        autoFocus={true}
      />

      {/* 다시 받기 버튼 */}
      <div className={styles.validateButton}>
        <p className={styles.timer}>{timeLeft}</p>
        <ButtonOnClick
          type="filled"
          text="다시 받기"
          color={isTimerActive ? 'disabled' : 'lightblue'}
          width="full"
          size="small"
          onClick={() => handleAgainButtonClick()}
        />
      </div>

      {/* 다음 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={isValid ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => handleButtonClick()}
        />
      </div>
    </div>
  );
}
