'use client';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validateNickname } from '@/utils/validations/userValidations';
import { useState, useCallback } from 'react';
import { useCheckNickname } from '@/hook/useCheckNickname';

export default function Nickname({ onNext }: any) {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const { value, setValue, errMsg, setErrMsg, validate } = useInput(nickname, validateNickname);
  const { checkNickname, isDuplicated, isPending, isSuccess } = useCheckNickname(setErrMsg);

  const handleButtonClick = useCallback(() => {
    setNickname(value);
    onNext();
  }, [value, setNickname, onNext]);

  const handleCheckNickname = useCallback(() => {
    checkNickname(value);
  }, [value]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="원하시는 닉네임을 입력해주세요"
          placeholder="닉네임을 입력해주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
        />
        <div className={stlyes.check}>
          <ButtonOnClick
            type="filled"
            text="중복확인"
            color={validate && !isPending ? 'blue' : 'disabled'}
            width="normal"
            size="small"
            disabled={!validate && !isPending}
            onClick={handleCheckNickname}
          />
        </div>
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color={!isDuplicated ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={!isDuplicated}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
