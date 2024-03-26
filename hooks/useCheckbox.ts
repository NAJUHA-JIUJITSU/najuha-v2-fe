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
      const newState = { ...prevState }; // 불변성 유지를 위한 새 객체 생성

      if (key === 'all') {
        // 'all' 키 토글 시 모든 체크박스 상태를 토글
        const allChecked = !prevState.all.checked;
        Object.keys(newState).forEach((k) => {
          newState[k] = { ...newState[k], checked: allChecked }; // 개별 체크박스 상태 업데이트
        });
      } else {
        // 개별 체크박스 토글
        newState[key] = { ...prevState[key], checked: !prevState[key].checked };

        // 'all' 상태 업데이트: 모든 체크박스가 체크되었는지 확인
        const allChecked = Object.keys(newState)
          .filter((k) => k !== 'all') // 'all' 제외
          .every((k) => newState[k].checked);

        newState.all = { ...newState.all, checked: allChecked }; // 'all' 상태 업데이트
      }

      return newState; // 업데이트된 새 상태 반환
    });
  }, []);

  return { state, toggleCheckbox, allRequiredAgreed };
}

export default useCheckboxState;
