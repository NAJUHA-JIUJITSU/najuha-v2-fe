'use client';
import { useState } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useInput } from '@/hook/useInput';
import { validateVerificationNumber } from '@/utils/validations/userValidations';
import { useVerify } from '@/hook/useVerify';

export default function Verify({ onNext }: any) {
  const { value, setValue, errMsg, validate, setErrMsg, setSuccessMsg, successMsg } = useInput(
    '',
    validateVerificationNumber,
  );
  const [localVerify, setLocalVerify] = useState(false);
  const { mutate, isPending } = useVerify();

  const handleButtonClick = () => {
    mutate(value, {
      onSuccess: (res) => {
        if (res.data.data) {
          setSuccessMsg('인증되었습니다.');
          setLocalVerify(true);
        } else {
          setErrMsg('인증번호가 올바르지 않습니다.');
          setLocalVerify(false);
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
          <ButtonOnClick
            type="filled"
            text="인증확인"
            color={validate && !isPending ? 'blue' : 'disabled'}
            width="normal"
            size="small"
            disabled={!validate || isPending}
            onClick={handleButtonClick}
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
