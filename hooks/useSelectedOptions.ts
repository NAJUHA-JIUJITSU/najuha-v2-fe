import { useState } from 'react';
import { SelectedOptions, Division } from '@/interfaces/competitionApply';

interface UseSelectedOptionsProps {
  initialOptions: SelectedOptions[];
  divisions: Division[];
  //   optionKeys: (keyof SelectedOptions)[];
}

const OPTION_KEYS: (keyof SelectedOptions)[] = ['uniform', 'category', 'belt', 'weight'];

export function useSelectedOptions({ initialOptions, divisions }: UseSelectedOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions[]>(initialOptions);

  // 옵션을 선택할 때 호출되는 함수, 현재 선택된 옵션을 업데이트
  const handleOptionSelect = (optionType: keyof SelectedOptions, value: string) => {
    setSelectedOptions((prev) => {
      const current =
        prev.length > 0
          ? prev[prev.length - 1]
          : { uniform: '', category: '', belt: '', weight: '' };
      const updatedOption = { ...current, [optionType]: value };
      if (prev.length === 0 || current[optionType]) {
        return [...prev, updatedOption];
      } else {
        return [...prev.slice(0, -1), updatedOption];
      }
    });
  };

  // 새 옵션 추가 기능, 비어 있는 새 옵션 객체를 상태 배열에 추가
  const handleAddNewOption = () => {
    setSelectedOptions((prev) => [...prev, { uniform: '', category: '', belt: '', weight: '' }]);
  };

  // 특정 인덱스의 옵션을 삭제하는 함수
  const handleDeleteOption = (index: number) => {
    setSelectedOptions((prev) => prev.filter((_, i) => i !== index));
  };

  // 이전 버튼 동작을 처리하는 함수, 가장 최근의 옵션을 삭제하거나 수정
  const undoLastOptionChange = () => {
    setSelectedOptions((prev) => {
      if (prev.length > 0) {
        const newOptions = [...prev];
        const currentOptions = newOptions[newOptions.length - 1];
        const nextOption = OPTION_KEYS.find((key) => !currentOptions[key]);
        if (nextOption === 'uniform') return prev; // Prevent action if 'uniform' needs to be set
        const optionKeysReversed = OPTION_KEYS.slice().reverse();
        let keyRemoved = false;
        for (const key of optionKeysReversed) {
          if (currentOptions[key] && key !== nextOption) {
            currentOptions[key] = '';
            keyRemoved = true;
            break;
          }
        }
        if (keyRemoved) newOptions[newOptions.length - 1] = currentOptions;
        console.log(newOptions);
        return newOptions;
      }
      return prev;
    });
  };

  // 모든 선택 옵션을 초기화하는 함수
  const resetLatestOption = () => {
    setSelectedOptions((prev) => [
      ...prev.slice(0, -1),
      { uniform: '', category: '', belt: '', weight: '' },
    ]);
  };

  // 선택된 옵션 중 빈 값을 가진 옵션을 제거하고 사용자에게 경고
  const cleanUpOptions = () => {
    // 먼저 빈 옵션의 존재 여부를 검사
    const hasIncompleteOptions = selectedOptions.some((option) =>
      Object.values(option).some((value) => value === ''),
    );

    // 빈 옵션이 있다면 사용자에게 경고
    if (hasIncompleteOptions) {
      alert('선택이 완료되지 않은 부문은 삭제됩니다');
    }

    // 빈 옵션이 없는 항목만 필터링하여 상태 업데이트
    setSelectedOptions((prev) =>
      prev.filter((option) => Object.values(option).every((value) => value !== '')),
    );
  };

  return {
    selectedOptions,
    handleOptionSelect,
    handleDeleteOption,
    undoLastOptionChange,
    handleAddNewOption,
    resetLatestOption,
    cleanUpOptions,
  };
}
