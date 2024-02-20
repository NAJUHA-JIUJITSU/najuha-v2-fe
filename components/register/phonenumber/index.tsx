'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function Phonenumber({ onNext }: any) {
  const [phonenumber, setPhonenumber] = useState('');
  const [phonenumberErrMsg, setPhonenumberErrMsg] = useState<string | null>(null);

  //validateBirth 함수
  const validatePhonenumber = (inputPhonenumber: string) => {
    // 입력된 값에서 숫자만 추출
    const numericValue = inputPhonenumber.replace(/[^0-9]/g, '');

    // 숫자를 'YYYY/MM/DD' 형식으로 변환
    const formattedPhonenumber =
      numericValue.slice(0, 3) +
      (numericValue.length > 3 ? '-' + numericValue.slice(3, 7) : '') +
      (numericValue.length > 7 ? '-' + numericValue.slice(7, 11) : '');

    // 실시간으로 형식에 맞게 업데이트
    setPhonenumber(formattedPhonenumber);

    // 11자리 미만일때 에러메시지
    if (numericValue.length < 11 && numericValue.length > 0) {
      setPhonenumberErrMsg('휴대폰 번호 11자리를 입력해주세요.');
      return false;
    }

    setPhonenumberErrMsg(null);
  };

  useEffect(() => {
    validatePhonenumber(phonenumber);
  }, [phonenumber]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="휴대폰 번호를 입력해주세요"
          placeholder="010-1234-1234"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          errMsg={phonenumberErrMsg}
        />
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
