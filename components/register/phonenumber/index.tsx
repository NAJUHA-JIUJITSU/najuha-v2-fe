'use client';
import { useState, useEffect, use, useCallback } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { phoneNumberState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validatePhonenumber } from '@/utils/validations/userValidations';

export default function Phonenumber({ onNext }: any) {
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);
  const { value, setValue, errMsg, validate } = useInput(phoneNumber, validatePhonenumber);

  const handleButtonClick = useCallback(() => {
    setPhoneNumber(value);
    onNext();
  }, [value, setPhoneNumber, onNext]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="휴대폰 번호를 입력해주세요"
          placeholder="010-1234-1234"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
        />
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={validate ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={!validate}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
