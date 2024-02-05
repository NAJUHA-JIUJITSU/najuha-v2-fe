'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function Verify({ onNext }: any) {
  const [verifyNumber, setVerifyNumber] = useState<string>('');
  const [numberErrMsg, setNumberErrMsg] = useState<string | null>(null);

  //validateNumber함수
  const validateNumber = (inputPhonenumber: string) => {
    // 입력된 값에서 숫자만 추출
    const numericValue = inputPhonenumber.replace(/[^0-4]/g, '');

    // 실시간으로 형식에 맞게 업데이트
    setVerifyNumber(numericValue);
  };

  useEffect(() => {
    validateNumber(verifyNumber);
  }, [verifyNumber]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="인증번호를 입력해주세요"
          placeholder="4자리 인증번호"
          value={verifyNumber}
          onChange={(e) => setVerifyNumber(e.target.value)}
          errMsg={numberErrMsg}
        />
        <div className={stlyes.check}>
          <ButtonOnClick
            type="filled"
            text="인증확인"
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
          onClick={onNext}
        />
      </div>
    </>
  );
}
