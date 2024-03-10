import { useState, useEffect } from 'react';

// 전화번호 형식(010-1234-1234)으로 변환
function formatNumber(number: string) {
  // 숫자만 추출
  const digits = number.replace(/\D/g, '');

  // 전화번호 형식에 맞게 변환 (010-1234-5678)
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }
}

// 실제로 존재하는 번호인지 검증
function isValidNumber(formatNumber: string) {
  // 전화번호 형식(010-1234-5678)에 맞는 정규식
  const regex = /^01[0-9]-[0-9]{4}-[0-9]{4}$/;
  return regex.test(formatNumber);
}

function usePhoneNumberValidation(initialNumber: string) {
  const [number, setNumber] = useState(initialNumber);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  // 이 함수는 number 상태의 변화에 따라 호출되며, 전화번호의 유효성을 검증합니다.
  const handleNumberChange = () => {
    const formattedNumber = formatNumber(number);
    setNumber(formattedNumber); // 입력값을 날짜형식 상태로 업데이트합니다.

    // 입력값이 13자리일 때만 유효성 검증을 수행합니다.
    if (formattedNumber.length === 13) {
      if (!isValidNumber(formattedNumber)) {
        setErrorMessage('유효한 전화번호를 입력해주세요.');
        setIsValid(false);
      } else {
        setErrorMessage(null);
        setIsValid(true);
      }
    } else if (formattedNumber.length !== 0) {
      setErrorMessage('11자리의 전화번호를 모두 입력해주세요.');
    } else {
      setErrorMessage(null);
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleNumberChange();
  }, [number]); // birth 상태가 변경될 때마다 handleBirthChange 함수를 호출합니다.

  return {
    number,
    setNumber,
    isValid,
    errorMessage,
  };
}

export default usePhoneNumberValidation;
