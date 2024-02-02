'use client';
import styles from './index.module.scss';
import Input from '../common/input';
import { useEffect, useState } from 'react';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface BirthPageProps {
  onNext: (data: any) => void;
  data: string;
}

export default function birthPage({ onNext, data }: BirthPageProps) {
  const [birth, setBirth] = useState<string>(data);
  const [birthErrMsg, setBirthErrMsg] = useState<string | null>('에러 메시지');

  //validateBirth 함수
  const validateBirth = (inputBirth: string) => {
    // 입력된 값에서 숫자만 추출
    const numericValue = inputBirth.replace(/[^0-9]/g, '');

    // 숫자를 'YYYY/MM/DD' 형식으로 변환
    const formattedBirth =
      numericValue.slice(0, 4) +
      (numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : '') +
      (numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : '');

    // 실시간으로 형식에 맞게 업데이트
    setBirth(formattedBirth);

    // 8자리를 모두 입력한 경우에만 검증
    if (formattedBirth.length === 10) {
      const year = formattedBirth.substring(0, 4);
      const month = formattedBirth.substring(5, 7);
      const day = formattedBirth.substring(8, 10);

      // 실제로 존재하는 날짜인지 검증
      const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));

      if (!isValidDate) {
        setBirthErrMsg('유효한 날짜를 입력해주세요.');
        return false;
      }
    }

    setBirthErrMsg(null);
    return true;
  };

  useEffect(() => {
    validateBirth(birth);
  }, [birth]);

  return (
    <div className={styles.wrapper}>
      <Input
        label="생년월일을 입력해주세요"
        placeholder="YYYY/MM/DD"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        errMsg={birthErrMsg}
      />
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={() => onNext(birth)}
        />
      </div>
    </div>
  );
}
