import { useState, useCallback } from 'react';

interface CheckboxState {
  [key: string]: boolean;
}

function useCheckboxState(initialState: CheckboxState) {
  const [state, setState] = useState<CheckboxState>(initialState);

  const toggleState = (key: string) => {
    return useCallback(() => {
      setState((prevState) => {
        // "전체 동의" 체크박스의 상태를 변경하는 경우
        if (key === 'all') {
          const newState = Object.keys(prevState).reduce<CheckboxState>((acc, cur) => {
            acc[cur] = !prevState.all; // 모든 상태를 "전체 동의" 체크박스와 동일하게 설정
            return acc;
          }, {} as CheckboxState);
          return newState;
        } else {
          // 개별 동의 항목의 상태를 변경하는 경우
          return {
            ...prevState,
            [key]: !prevState[key],
          };
        }
      });
    }, []);
  };

  return [state, toggleState] as const;
}

export default useCheckboxState;
