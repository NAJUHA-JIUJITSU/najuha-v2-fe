'use client';
import { useState, useEffect, useCallback } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { birthDateState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validateBirthdate } from '@/utils/validations/userValidations';

export default function Birthday({ onNext }: any) {
  const [birth, setBirth] = useRecoilState(birthDateState);
  const { value, setValue, errMsg } = useInput(birth, validateBirthdate);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="생년월일을 입력해주세요"
          placeholder="YYYY/MM/DD"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
        />
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={() => {
            setBirth(value);
            onNext();
          }}
        />
      </div>
    </>
  );
}
