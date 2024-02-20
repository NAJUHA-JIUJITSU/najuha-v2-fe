'use client';
import { useState, useEffect, useCallback } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function Birthday({ onNext }: any) {
  const [birth, setBirth] = useState('');
  const [birthErrMsg, setBirthErrMsg] = useState<string | null>(null);

  const validateBirth = useCallback((inputBirth: string) => {
    // 입력된 값에서 숫자만 추출
    const numericValue = inputBirth.replace(/[^0-9]/g, '');

    // 숫자를 'YYYY/MM/DD' 형식으로 변환
    const formattedBirth = `${numericValue.slice(0, 4)}${
      numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : ''
    }${numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : ''}`;

    // 실시간으로 형식에 맞게 업데이트
    setBirth(formattedBirth);

    // 8자리를 모두 입력한 경우에만 검증
    if (formattedBirth.length === 10) {
      // 실제로 존재하는 날짜인지 검증
      const isValidDate = !isNaN(Date.parse(formattedBirth.replace(/\//g, '-')));
      setBirthErrMsg(isValidDate ? null : '유효한 날짜를 입력해주세요.');
    }
  }, []);

  useEffect(() => {
    validateBirth(birth);
  }, [birth]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="생년월일을 입력해주세요"
          placeholder="YYYY/MM/DD"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          errMsg={birthErrMsg}
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
