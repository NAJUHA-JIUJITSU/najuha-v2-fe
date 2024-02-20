import { useState, useEffect } from 'react';

export function useInput(initialValue: any, validateSync: any) {
  const [value, setValue] = useState(initialValue);
  const [errMsg, setErrMsg] = useState('');

  // 동기 유효성 검사 실행
  useEffect(() => {
    if (validateSync && value !== '') {
      validateSync(value, setErrMsg, setValue);
    }
  }, [value, validateSync]);

  return { value, setValue, errMsg, setErrMsg };
}
