import { useState, useEffect } from 'react';

export function useInput(initialValue: any, validateSync?: any) {
  const [value, setValue] = useState(initialValue);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [validate, setValidate] = useState(false);

  // 동기 유효성 검사 실행
  useEffect(() => {
    if (validateSync && value !== '') {
      const result = validateSync(value, setErrMsg, setValue, setSuccessMsg);
      setValidate(result);
    }
  }, [value, validateSync]);

  return { value, setValue, errMsg, setErrMsg, successMsg, setSuccessMsg, validate };
}
