import { useState, useCallback } from 'react';

interface CheckboxState {
  [key: string]: boolean;
}

function useCheckboxState(initialState: CheckboxState): [CheckboxState, (key: string) => void] {
  const [state, setState] = useState(initialState);

  // 체크박스 상태를 토글하는 함수
  const toggleCheckbox = useCallback((key: string) => {
    setState((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      // "all" 체크박스 로직 처리
      if (key === 'all') {
        Object.keys(newState).forEach((k) => (newState[k] = newState.all));
      } else {
        // 필수 항목이 모두 체크되었는지 검사하여 "all" 상태 업데이트
        const allChecked = Object.keys(newState)
          .filter((k) => k !== 'all')
          .every((k) => newState[k]);
        newState.all = allChecked;
      }
      return newState;
    });
  }, []);

  return [state, toggleCheckbox];
}
export default useCheckboxState;
