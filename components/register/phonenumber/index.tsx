import React, { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

const PHONE_NUMBER_MAX = 11;

enum ValidState {
  EMPTY,
  TOO_SHORT,
  VALID,
}

const errorMsgMap = {
  [ValidState.EMPTY]: null,
  [ValidState.TOO_SHORT]: `휴대폰 번호 ${PHONE_NUMBER_MAX}자리를 입력해주세요.`,
  [ValidState.VALID]: null,
};

const rules = {
  isEmpty: (phone: string) => phone.length === 0,
  isTooShort: (phone: string) => phone.length < PHONE_NUMBER_MAX,
};

const formatPhoneNumber = (inputPhone: string) => {
  const numericValue = inputPhone.replace(/[^0-9]/g, '');
  const formatted =
    numericValue.slice(0, 3) +
    (numericValue.length > 3 ? '-' + numericValue.slice(3, 7) : '') +
    (numericValue.length > 7 ? '-' + numericValue.slice(7) : '');
  return formatted.slice(0, 13);
};

const validatePhoneNumber = (phoneNumber: string): ValidState => {
  if (rules.isEmpty(phoneNumber)) return ValidState.EMPTY;
  if (rules.isTooShort(phoneNumber)) return ValidState.TOO_SHORT;
  return ValidState.VALID;
};

// TODO: 전화번호 인증 로직 추가
const PhoneNumber = ({ onNext }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber || '');
  const [validationState, setValidState] = useState<ValidState>(ValidState.EMPTY);

  const phoneInputHandler = (inputPhone: string) => {
    const formattedPhone = formatPhoneNumber(inputPhone);
    const validState = validatePhoneNumber(formattedPhone.replace(/-/g, ''));
    setPhoneNumber(formattedPhone);
    setValidState(validState);
    setUser((prevUser) => ({
      ...prevUser,
      phoneNumber: formattedPhone.replace(/-/g, ''),
    }));
  };

  useEffect(() => {
    phoneInputHandler(phoneNumber);
  }, [phoneNumber]);

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="휴대폰 번호를 입력해주세요"
          placeholder="010-1234-5678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          errMsg={errorMsgMap[validationState]}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="전화번호 인증"
          color="blue"
          width="full"
          size="large"
          disabled={validationState !== ValidState.VALID}
          onClick={onNext}
        />
      </div>
    </>
  );
};

export default PhoneNumber;
