'use client';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validateNickname } from '@/utils/validations/userValidations';
import { useState, useCallback } from 'react';

export default function Nickname({ onNext }: any) {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const { value, setValue, errMsg, validate } = useInput(nickname, validateNickname);
  const [localVerify, setLocalVerify] = useState(false);

  const handleButtonClick = useCallback(() => {
    setNickname(value);
    onNext();
  }, [value, setNickname, onNext]);

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
            color={validate ? 'blue' : 'disabled'}
            width="normal"
            size="small"
            disabled={!validate}
            onClick={() => {
              setLocalVerify(true);
            }}
          />
        </div>
      </div>

      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color={localVerify ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={!localVerify}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
