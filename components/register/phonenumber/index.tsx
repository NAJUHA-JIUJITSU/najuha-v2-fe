import React, { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

enum PhoneValidationState {
  EMPTY,
  TOO_SHORT,
  VALID,
}

const ErrorMsgMap = {
  [PhoneValidationState.EMPTY]: null,
  [PhoneValidationState.TOO_SHORT]: '휴대폰 번호 11자리를 입력해주세요.',
  [PhoneValidationState.VALID]: null,
};

const formatPhoneNumber = (inputPhone: string) => {
  const numericValue = inputPhone.replace(/[^0-9]/g, '');
  const formatted =
    numericValue.slice(0, 3) +
    (numericValue.length > 3 ? '-' + numericValue.slice(3, 7) : '') +
    (numericValue.length > 7 ? '-' + numericValue.slice(7) : '');

  return formatted.slice(0, 13);
};

const validatePhoneNumber = (phone: string): PhoneValidationState => {
  const numericValue = phone.replace(/[^0-9]/g, '');
  if (numericValue === '') return PhoneValidationState.EMPTY;
  if (numericValue.length < 11) return PhoneValidationState.TOO_SHORT;
  return PhoneValidationState.VALID;
};

// TODO: 전화번호 인증 로직 추가
const PhoneNumber = ({ onNext }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber || '');
  const [phoneValidationState, setPhoneValidationState] = useState<PhoneValidationState>(
    PhoneValidationState.EMPTY,
  );

  const phoneInputHandler = (inputPhone: string) => {
    const formattedPhone = formatPhoneNumber(inputPhone);
    const validationState = validatePhoneNumber(formattedPhone);
    setPhoneNumber(formattedPhone);
    setPhoneValidationState(validationState);
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
          errMsg={ErrorMsgMap[phoneValidationState]}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="전화번호 인증"
          color="blue"
          width="full"
          size="large"
          disabled={phoneValidationState !== PhoneValidationState.VALID}
          onClick={onNext}
        />
      </div>
    </>
  );
};

export default PhoneNumber;
