import { useEffect, useState } from 'react';

export enum ValidState {
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
  isEmpty: (birth: string): boolean => birth.length === 0,
  isTooShort: (birth: string): boolean => birth.length < 10,
  isInvalidDate: (date: string): boolean => {
    // 윤년, 및 4월 31일 등의 유효하지 않은 날짜를 검증하는 함수
    const parts = date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);

    if (
      dateObj.getFullYear() !== year ||
      dateObj.getMonth() !== month ||
      dateObj.getDate() !== day
    ) {
      return true;
    }
    return false;
  },
};

const formatBirth = (inputBirth: string): string => {
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
  if (rules.isInvalidDate(birthDate)) return ValidState.INVALID_DATE;
  return ValidState.VALID;
};

export const useBirthValidation = (initialBirth: string) => {
  const [birth, setBirth] = useState<string>(formatBirth(initialBirth));
  const [validationState, setValidationState] = useState<ValidState>(ValidState.EMPTY);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    hadleUpdateBirth(birth);
  }, [birth]);

  const hadleUpdateBirth = (inputBirth: string) => {
    const formattedBirth = formatBirth(inputBirth);
    const validState = validateBirth(formattedBirth);
    setBirth(formattedBirth);
    setValidationState(validState);
    setErrorMessage(errorMsgMap[validState]);
  };

  return { birth, setBirth, validationState, errorMessage };
};
