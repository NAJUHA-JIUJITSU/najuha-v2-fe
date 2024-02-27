'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { verificationState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validateVerificationNumber } from '@/utils/validations/userValidations';

export default function Verify({ onNext }: any) {
  const [verify, setVerify] = useRecoilState(verificationState);
  const { value, setValue, errMsg, validate, setErrMsg } = useInput('', validateVerificationNumber);
  const [localVerify, setLocalVerify] = useState(verify);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="인증번호를 입력해주세요"
          placeholder="4자리 인증번호"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
        />
        <div className={stlyes.check}>
          <ButtonOnClick
            type="filled"
            text="인증확인"
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
          text="다음"
          color={localVerify ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={!localVerify}
          onClick={onNext}
        />
      </div>
    </>
  );
}
