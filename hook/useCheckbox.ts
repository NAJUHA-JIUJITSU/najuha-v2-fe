import { useState, useCallback, useEffect } from 'react';

interface CheckboxState {
  [key: string]: boolean;
}

function useCheckboxState(initialState: CheckboxState) {
  const [state, setState] = useState<CheckboxState>(initialState);

  const toggleState = (key: string) => {
    return useCallback(
      () =>
        setState((prevState) => {
          const newState = {
            ...prevState,
            [key]: !prevState[key],
          };

          // 약관 전체 동의 체크 여부 확인
          const isAllChecked = Object.values(newState).every((value) => value);

          // 약관 전체 동의 체크 여부에 따라 약관전체동의 체크 상태 업데이트
          newState.all = isAllChecked;

          return newState;
        }),
      [],
    );
  };

  const setAllTrue = useCallback((value: boolean) => {
    setState((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        newState[key] = value;
      });
      return newState;
    });
  }, []);

  return [state, toggleState, setAllTrue] as const;
}

export default useCheckboxState;
