import { useMemo } from 'react';
import { Division, SelectedOptions } from '@/interfaces/competitionApply';

export function useDivisionFilter(divisions: Division[], selectedOptions: SelectedOptions[]) {
  // 현재 선택된 옵션의 마지막 항목을 기준으로 다음 선택할 옵션을 결정합니다.
  const currentSelection = selectedOptions[selectedOptions.length - 1] || {};

  // 선택 가능한 옵션의 종류를 정의합니다.
  const optionKeys: (keyof SelectedOptions)[] = ['uniform', 'category', 'belt', 'weight'];

  // 필터링된 대회 목록을 계산합니다.
  const filteredDivisions = useMemo(() => {
    return divisions.filter((division) => {
      return optionKeys.every(
        (key) => !currentSelection[key] || division[key] === currentSelection[key],
      );
    });
  }, [divisions, currentSelection]);

  // 다음에 선택할 옵션
  const nextOption = useMemo(() => {
    const existingKeys = optionKeys.filter((key) => currentSelection[key]);
    return optionKeys.find((key) => !existingKeys.includes(key));
  }, [currentSelection, optionKeys]);

  // 필터링된 대회 목록에서 다음에 선택할 수 있는 옵션
  const optionsToShow = useMemo(() => {
    if (!nextOption) return [];
    const uniqueOptions = new Set(filteredDivisions.map((division) => division[nextOption]));
    return Array.from(uniqueOptions).sort();
  }, [filteredDivisions, nextOption]);

  return {
    filteredDivisions,
    optionsToShow,
    nextOption,
  };
}
