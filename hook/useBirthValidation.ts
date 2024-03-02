import { useState, useEffect } from 'react';

// 날짜형식(YYYY/MM/DD)으로 변환
function formatBirth(inputBirth: string) {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  return (
    numericValue.slice(0, 4) +
    (numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : '') +
    (numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : '')
  );
}

// 실제로 존재하는 날짜인지 검증
// Todo: 윤달, 30일, 31일 등의 유효성 검증 로직 추가
function isValidDate(formattedBirth: string) {
  const year = formattedBirth.substring(0, 4);
  const month = formattedBirth.substring(5, 7);
  const day = formattedBirth.substring(8, 10);
  const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));

  return isValidDate;
}

function useBirthValidation(initialBirth: string) {
  const [birth, setBirth] = useState(initialBirth);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  // 이 함수는 birth 상태의 변화에 따라 호출되며, 생년월일의 유효성을 검증합니다.
  const handleBirthChange = () => {
    const formattedBirth = formatBirth(birth);
    setBirth(formattedBirth); // 입력값을 날짜형식 상태로 업데이트합니다.

    // 입력값이 10자리일 때만 유효성 검증을 수행합니다.
    if (formattedBirth.length === 10) {
      if (!isValidDate(formattedBirth)) {
        setErrorMessage('유효한 날짜를 입력해주세요.');
        setIsValid(false);
      } else {
        setErrorMessage(null);
        setIsValid(true);
      }
    } else {
      setErrorMessage(null);
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleBirthChange();
  }, [birth]); // birth 상태가 변경될 때마다 handleBirthChange 함수를 호출합니다.

  return {
    birth,
    setBirth,
    isValid,
    errorMessage,
  };
}

export default useBirthValidation;
