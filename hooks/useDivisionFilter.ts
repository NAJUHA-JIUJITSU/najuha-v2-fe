import { useMemo } from 'react';
import { Division, SelectedOptions, PlayerInfo } from '@/interfaces/competitionApply';

export function useDivisionFilter(
  divisions: Division[],
  selectedOptions: SelectedOptions[],
  playerInfo: PlayerInfo,
) {
  // 현재 선택된 옵션의 마지막 항목을 기준으로 다음 선택할 옵션을 결정합니다.
  const currentSelection = selectedOptions[selectedOptions.length - 1] || {};

  // 선택 가능한 옵션의 종류를 정의합니다.
  const optionKeys: (keyof SelectedOptions)[] = ['uniform', 'category', 'belt', 'weight'];

  // 필터링된 대회 목록을 계산합니다.
  // playerbirth가 1998/04/04여서 앞에 4글자만써야함
  const filteredDivisions = useMemo(() => {
    return divisions.filter((division) => {
      const isWithinBirthYearRange =
        division.birthYearRangeStart <= playerInfo.birth.slice(0, 4) &&
        division.birthYearRangeEnd >= playerInfo.birth.slice(0, 4);
      const isGenderMatch =
        division.gender === 'MIXED' ||
        division.gender === playerInfo.gender ||
        division.gender === (playerInfo.gender === '남성' ? 'MALE' : 'FEMALE');
      return (
        isWithinBirthYearRange &&
        isGenderMatch &&
        optionKeys.every((key) => !currentSelection[key] || division[key] === currentSelection[key])
      );
    });
  }, [divisions, currentSelection, optionKeys, playerInfo]);
  console.log(filteredDivisions);
  // 다음에 선택할 옵션
  const nextOption: keyof SelectedOptions | null = useMemo(() => {
    const existingKeys = optionKeys.filter((key) => currentSelection[key]);
    return optionKeys.find((key) => !existingKeys.includes(key)) || null;
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
