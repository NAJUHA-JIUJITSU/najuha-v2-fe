import { useState } from 'react';

export enum ValidState {
  EMPTY,
  TOO_SHORT,
  VALID,
}

const PHONE_NUMBER_MAX = 11;

const errorMsgMap = {
  [ValidState.EMPTY]: null,
  [ValidState.TOO_SHORT]: `휴대폰 번호는 ${PHONE_NUMBER_MAX}자리를 입력해주세요.`,
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
  if (rules.isTooShort(phoneNumber.replace(/-/g, ''))) return ValidState.TOO_SHORT;
  return ValidState.VALID;
};

export const usePhoneNumberValidation = (initialPhoneNumber: string) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
  const [validState, setValidState] = useState<ValidState>(ValidState.EMPTY);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updatePhoneNumber = (inputPhone: string) => {
    const formattedPhone = formatPhoneNumber(inputPhone);
    const validState = validatePhoneNumber(formattedPhone);
    setPhoneNumber(formattedPhone);
    setValidState(validState);
    setErrorMessage(errorMsgMap[validState]);
  };

  return { phoneNumber, updatePhoneNumber, validState, errorMessage };
};
