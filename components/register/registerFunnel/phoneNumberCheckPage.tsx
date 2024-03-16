'use client';
import { useState, useCallback } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useInput } from '@/hook/useInput';
import { validateVerificationNumber } from '@/utils/validations/userValidations';
import { useConfirmAuthCode, useSendAuthCode } from '@/hook/register';
import { useRecoilValue } from 'recoil';
import { phoneNumberState } from '@/recoil/atoms/registerState';
import { useTimer } from '@/hook/useTimer';

export default function Verify({ onNext }: any) {
  const { value, setValue, errMsg, validate, setErrMsg, setSuccessMsg, successMsg } = useInput(
    '',
    validateVerificationNumber,
  );
  const { mutate, isPending } = useConfirmAuthCode();
  const { mutate: getAuthCode, isPending: isLoading } = useSendAuthCode(); //todo: isPending 사용해서 버튼 비활성화
  const { isTimeOver, resetTimer, formatTime } = useTimer();
  const phoneNumber = useRecoilValue(phoneNumberState);

  const handleGetAuthCode = useCallback(() => {
    getAuthCode(phoneNumber, {
      onSuccess: (res) => {
        console.log(res);
        resetTimer();
      },
      onError: () => {
        setErrMsg('인증번호 발송중 오류가 발생했습니다.');
      },
    });
  }, []);

  const handleButtonClick = () => {
    mutate(value, {
      onSuccess: (res) => {
        if (res.data.result) {
          onNext();
        } else {
          setErrMsg('인증번호가 올바르지 않습니다.');
        }
      },
      onError: (error: any) => {
        console.log(error);
        setErrMsg('인증번호 확인 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="인증번호를 입력해주세요"
          placeholder="6자리 인증번호"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
          successMsg={successMsg}
        />
        <div className={stlyes.check}>
          {!isTimeOver && <div className={stlyes.timer}>{formatTime()}</div>}
          <ButtonOnClick
            type="filled"
            text="다시 받기"
            color={isLoading || !isTimeOver ? 'disabled' : 'lightblue'} // 시간개념들어가야함
            width="normal"
            size="small"
            disabled={isLoading || !isTimeOver} // 시간개념들어가야함
            onClick={handleGetAuthCode}
          />
        </div>
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={validate ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={!validate || isPending}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
