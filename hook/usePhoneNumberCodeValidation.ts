import { useState, useEffect } from 'react';

function usePhoneNumberCodeValidation() {
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [timeLeft, setTimeLeft] = useState<number>(180); // 3분을 초 단위로 설정
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const handleCodeChange = () => {
    if (code.length > 6) {
      const trimmedCode = code.slice(0, 6);
      setCode(trimmedCode);
    }

    if (code.length === 6) {
      setErrorMessage(null);
      setIsValid(true);
    } else if (code.length !== 0) {
      setErrorMessage('6자리 인증번호를 입력해주세요.');
      setIsValid(false);
    } else {
      setErrorMessage(null);
      setIsValid(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isTimerActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            setIsTimerActive(false); // 시간이 0이 되면 타이머를 비활성화
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTimerActive, timeLeft]);

  // 타이머를 재설정하고 다시 시작하는 함수
  const resetTimer = () => {
    setTimeLeft(10); // 타이머를 3분으로 재설정
    setIsTimerActive(true); // 타이머를 다시 시작
  };

  // 타이머를 분:초 형태로 포맷팅하는 함수
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    handleCodeChange();
  }, [code]);

  return {
    code,
    setCode,
    isValid,
    errorMessage,
    setErrorMessage,
    isTimerActive,
    resetTimer,
    timeLeft: formatTime(), // 포맷팅된 시간을 'timeLeft'로 직접 반환,
  };
}

export default usePhoneNumberCodeValidation;
