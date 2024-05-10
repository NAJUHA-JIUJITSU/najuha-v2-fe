'use client';
import { useState, useEffect, useCallback } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { birthDateState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hooks/useInput';
import { validateBirthdate } from '@/utils/validations/userValidations';

interface BirthdayProps {
  onNext: () => void;
  submitText?: string;
}

export default function Birthday({ onNext, submitText = '다음' }: BirthdayProps) {
  const [birth, setBirth] = useRecoilState(birthDateState);
  const { value, setValue, errMsg, validate } = useInput(birth, validateBirthdate);

  const handleButtonClick = useCallback(() => {
    setBirth(value);
    onNext();
  }, [value, setBirth, onNext]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="생년월일을 입력해주세요"
          placeholder="YYYY/MM/DD"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
          autoFocus={true}
        />
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text={submitText}
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
