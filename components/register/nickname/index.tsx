'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validateNickname } from '@/utils/validations/userValidations';
import { on } from 'events';

export default function Nickname({ onNext }: any) {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const { value, setValue, errMsg } = useInput(nickname, validateNickname);

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
            color="disabled"
            width="normal"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>

      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={() => {
            setNickname(value);
            onNext();
          }}
        />
      </div>
    </>
  );
}
