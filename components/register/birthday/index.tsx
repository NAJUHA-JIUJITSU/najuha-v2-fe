import React, { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

enum ValidState {
  EMPTY,
  TOO_SHORT,
  INVALID_DATE,
  VALID,
}

const errorMsgMap = {
  [ValidState.EMPTY]: null,
  [ValidState.TOO_SHORT]: 'YYYY-MM-DD 형식으로 입력해주세요.',
  [ValidState.INVALID_DATE]: '유효한 날짜를 입력해주세요.',
  [ValidState.VALID]: null,
};

const rules = {
  isEmpty: (birth: string) => birth.length === 0,
  isTooShort: (birth: string) => birth.length < 10,
  hasInvalidDate: (birth: string) => isNaN(Date.parse(birth)),
};

const formatBirthInput = (inputBirth: string) => {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  const formattedBirth =
    numericValue.slice(0, 4) +
    (numericValue.length > 4 ? '-' + numericValue.slice(4, 6) : '') +
    (numericValue.length > 6 ? '-' + numericValue.slice(6, 8) : '');
  return formattedBirth;
};

const validateBirth = (birthDate: string): ValidState => {
  if (rules.isEmpty(birthDate)) return ValidState.EMPTY;
  if (rules.isTooShort(birthDate)) return ValidState.TOO_SHORT;
  if (rules.hasInvalidDate(birthDate)) return ValidState.INVALID_DATE;
  return ValidState.VALID;
};

export default function Birthday({ onNext }: Props) {
  const [user, setUser] = useRecoilState(userAtom);
  const [birth, setBirth] = useState<string>(user.birth || '');
  const [birthValidationState, setValidState] = useState<ValidState>(ValidState.EMPTY);

  const birthInputHandler = (inputBirth: string) => {
    const formattedBirth = formatBirthInput(inputBirth);
    const birthValidState = validateBirth(formattedBirth);
    setBirth(formattedBirth);
    setValidState(birthValidState);
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
          errMsg={errorMsgMap[birthValidationState]}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          disabled={birthValidationState !== ValidState.VALID}
          onClick={onNext}
        />
      </div>
    </>
  );
}
