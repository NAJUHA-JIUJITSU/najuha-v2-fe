import { useState } from 'react';

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
  isEmpty: (birth: string) => birth.length === 0,
  isTooShort: (birth: string) => birth.length < 10,
  hasInvalidDate: (birth: string) => isNaN(Date.parse(birth)),
};

const formatBirthInput = (inputBirth: string): string => {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  const formattedBirth =
    numericValue.slice(0, 4) +
    (numericValue.length > 4 ? '-' + numericValue.slice(4, 6) : '') +
    (numericValue.length > 6 ? '-' + numericValue.slice(6, 8) : '');
  return formattedBirth;
};

export const useBirthdayValidation = (initialBirth: string) => {
  const [birth, setBirth] = useState<string>(formatBirthInput(initialBirth));
  const [validationState, setValidationState] = useState<ValidState>(ValidState.EMPTY);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateBirth = (inputBirth: string) => {
    const formattedBirth = formatBirthInput(inputBirth);
    const validState = validateBirth(formattedBirth);
    setBirth(formattedBirth);
    setValidationState(validState);
    setErrorMessage(errorMsgMap[validState]);
  };

  const validateBirth = (birthDate: string): ValidState => {
    if (rules.isEmpty(birthDate)) return ValidState.EMPTY;
    if (rules.isTooShort(birthDate)) return ValidState.TOO_SHORT;
    if (rules.hasInvalidDate(birthDate)) return ValidState.INVALID_DATE;
    return ValidState.VALID;
  };

  return { birth, updateBirth, validationState, errorMessage };
};
