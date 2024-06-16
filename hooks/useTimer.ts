import { useState, useEffect, useCallback } from 'react';

// useTimer 커스텀 훅
export function useTimer(initialTime = 30) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    let intervalId: any;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const resetTimer = useCallback(() => {
    setTimer(initialTime);
  }, [initialTime]);

  // 시간을 mm:ss 포맷으로 변환하는 함수
  const formatTime = useCallback(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [timer]);

  const isTimeOver = timer === 0;

  return { timer, isTimeOver, resetTimer, formatTime };
}
