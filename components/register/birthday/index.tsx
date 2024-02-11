import React, { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

enum BirthValidationState {
  EMPTY,
  TOO_SHORT,
  INVALID_DATE,
  VALID,
}

const ErrorMsgMap = {
  [BirthValidationState.EMPTY]: null,
  [BirthValidationState.TOO_SHORT]: 'YYYY-MM-DD 형식으로 입력해주세요.',
  [BirthValidationState.INVALID_DATE]: '유효한 날짜를 입력해주세요.',
  [BirthValidationState.VALID]: null,
};

const formatBirthInput = (inputBirth: string) => {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  const formattedBirth =
    numericValue.slice(0, 4) +
    (numericValue.length > 4 ? '-' + numericValue.slice(4, 6) : '') +
    (numericValue.length > 6 ? '-' + numericValue.slice(6, 8) : '');
  return formattedBirth;
};

const validBirthDate = (birthDate: string): BirthValidationState => {
  if (birthDate === '') return BirthValidationState.EMPTY;
  if (birthDate.length < 10) return BirthValidationState.TOO_SHORT;
  if (isNaN(Date.parse(birthDate))) return BirthValidationState.INVALID_DATE;
  return BirthValidationState.VALID;
};

export default function Birthday({ onNext }: Props) {
  const [user, setUser] = useRecoilState(userAtom);
  const [birth, setBirth] = useState<string>(user.birth || '');
  const [birthValidationState, setBirthValidationState] = useState<BirthValidationState>(
    BirthValidationState.EMPTY,
  );

  const birthInputHandler = (inputBirth: string) => {
    const formattedBirth = formatBirthInput(inputBirth);
    const birthBirthValidationState = validBirthDate(formattedBirth);
    setBirth(formattedBirth);
    setBirthValidationState(birthBirthValidationState);
    setUser((user) => ({
      ...user,
      birth: formattedBirth.replace(/-/g, ''),
    }));
  };

  useEffect(() => {
    birthInputHandler(birth);
  }, [birth]);

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="생년월일을 입력해주세요"
          placeholder="YYYY-MM-DD"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          errMsg={ErrorMsgMap[birthValidationState]}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          disabled={birthValidationState !== BirthValidationState.VALID}
          onClick={onNext}
        />
      </div>
    </>
  );
}
