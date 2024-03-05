import { useState, useCallback } from 'react';
import { useMemo } from 'react';

interface CheckboxItem {
  checked: boolean;
  required: boolean;
}

interface CheckboxState {
  [key: string]: CheckboxItem;
}

// initialState를 CheckboxState 타입으로 받도록 수정합니다.
function useCheckboxState(initialState: CheckboxState) {
  const [state, setState] = useState(initialState);

  // 모든 필수 항목이 동의되었는지 계산
  const allRequiredAgreed = useMemo(() => {
    return Object.entries(state).every(([key, value]) => {
      // 'all' 키는 무시하고, 나머지 항목의 checked와 required를 검사
      if (key === 'all') return true;
      return !value.required || value.checked;
    });
  }, [state]);

  const toggleCheckbox = useCallback((key: string) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        [key]: { ...prevState[key], checked: !prevState[key].checked },
      };

      // 'all' 토글 로직 처리
      if (key === 'all') {
        Object.keys(newState).forEach((k) => {
          newState[k] = { ...newState[k], checked: newState.all.checked };
        });
      } else {
        // 나머지 항목 토글 후 'all' 상태 업데이트
        const allChecked = Object.values(newState).every((item) => item.checked);
        newState.all.checked = allChecked;
      }

      return newState;
    });
  }, []);

  return { state, toggleCheckbox, allRequiredAgreed };
}

export default useCheckboxState;
