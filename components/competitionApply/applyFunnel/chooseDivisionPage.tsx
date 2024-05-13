import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import IconRefresh from '@/public/svgs/refresh.svg';
import { useState } from 'react';
import IconClose from '@/public/svgs/closeSmall.svg';
import { PlayerInfo, SelectedOptions } from '@/interfaces/competitionApply';

interface Division {
  id: string;
  category: string;
  uniform: string;
  gender: string;
  belt: string;
  weight: string;
  birthYearRangeStart: string;
  birthYearRangeEnd: string;
}

const divisions: Division[] = [
  {
    id: 'pg8kxpna30tqdfir',
    category: '고등부',
    uniform: '노기',
    gender: 'MALE',
    belt: '블랙',
    weight: '-76',
    birthYearRangeStart: '2006',
    birthYearRangeEnd: '2008',
  },
  {
    id: 'r8gjs20s9a8ef2md',
    category: '어덜트',
    uniform: '기',
    gender: 'FEMALE',
    belt: '블랙',
    weight: '-64',
    birthYearRangeStart: '1900',
    birthYearRangeEnd: '9999',
  },
  {
    id: '0gc4j9wvmd0v3ab4',
    category: '어덜트',
    uniform: '노기',
    gender: 'MALE',
    belt: '블루',
    weight: '-94',
    birthYearRangeStart: '1900',
    birthYearRangeEnd: '9999',
  },
  {
    id: 'pqm9h0plnpbc4aa1',
    category: '중등부',
    uniform: '기',
    gender: 'FEMALE',
    belt: '유색',
    weight: '-58',
    birthYearRangeStart: '2009',
    birthYearRangeEnd: '2011',
  },
  {
    id: '7lki99fgqhd8f21b',
    category: '고등부',
    uniform: '노기',
    gender: 'FEMALE',
    belt: '블루',
    weight: '-88',
    birthYearRangeStart: '2006',
    birthYearRangeEnd: '2008',
  },
  {
    id: '5sg8jp1tdb2enmy9',
    category: '초등부',
    uniform: '노기',
    gender: 'MALE',
    belt: '화이트',
    weight: '-82',
    birthYearRangeStart: '2012',
    birthYearRangeEnd: '2017',
  },
  {
    id: 'gjvse8f2tvlmdhkr',
    category: '어덜트',
    uniform: '기',
    gender: 'FEMALE',
    belt: '퍼플',
    weight: '-72',
    birthYearRangeStart: '1900',
    birthYearRangeEnd: '9999',
  },
  {
    id: '7yfhs89nltqqd3b0',
    category: '중등부',
    uniform: '노기',
    gender: 'MALE',
    belt: '화이트',
    weight: '-70',
    birthYearRangeStart: '2009',
    birthYearRangeEnd: '2011',
  },
  {
    id: 's9udcja6tf0v7kg9',
    category: '초등부',
    uniform: '기',
    gender: 'FEMALE',
    belt: '유색',
    weight: '-100',
    birthYearRangeStart: '2012',
    birthYearRangeEnd: '2017',
  },
  {
    id: '3f40sp7u5ev8myar',
    category: '마스터',
    uniform: '노기',
    gender: 'MALE',
    belt: '블랙',
    weight: '-64',
    birthYearRangeStart: '0000',
    birthYearRangeEnd: '1994',
  },
  {
    id: 'yfh98wplvb2i0mn9',
    category: '중등부',
    uniform: '기',
    gender: 'FEMALE',
    belt: '유색',
    weight: '-58',
    birthYearRangeStart: '2009',
    birthYearRangeEnd: '2011',
  },
  {
    id: 'q0sh39dlb8i7ud1c',
    category: '어덜트',
    uniform: '노기',
    gender: 'FEMALE',
    belt: '블랙',
    weight: '-88',
    birthYearRangeStart: '1900',
    birthYearRangeEnd: '9999',
  },
  {
    id: '1c70fhd4jiv9w8n2',
    category: '마스터',
    uniform: '기',
    gender: 'MALE',
    belt: '블루',
    weight: '-94',
    birthYearRangeStart: '0000',
    birthYearRangeEnd: '1994',
  },
  {
    id: 'sg28j1kfnd0pew9u',
    category: '고등부',
    uniform: '기',
    gender: 'MALE',
    belt: '브라운',
    weight: '-100',
    birthYearRangeStart: '2006',
    birthYearRangeEnd: '2008',
  },
  {
    id: 'j9wp28sf0g1v7krb',
    category: '어덜트',
    uniform: '노기',
    gender: 'FEMALE',
    belt: '퍼플',
    weight: '-64',
    birthYearRangeStart: '1900',
    birthYearRangeEnd: '9999',
  },
  {
    id: 'mdj8s29ftp0v0kr2',
    category: '중등부',
    uniform: '기',
    gender: 'MALE',
    belt: '화이트',
    weight: '-82',
    birthYearRangeStart: '2009',
    birthYearRangeEnd: '2011',
  },
  {
    id: 'vndp08hksf9w7glc',
    category: '초등부',
    uniform: '노기',
    gender: 'FEMALE',
    belt: '유색',
    weight: '-94',
    birthYearRangeStart: '2012',
    birthYearRangeEnd: '2017',
  },
  {
    id: '9kdf2p38vghiwubr',
    category: '고등부',
    uniform: '기',
    gender: 'FEMALE',
    belt: '화이트',
    weight: '-76',
    birthYearRangeStart: '2006',
    birthYearRangeEnd: '2008',
  },
  {
    id: '1flb9kysgd2hq83c',
    category: '마스터',
    uniform: '노기',
    gender: 'MALE',
    belt: '브라운',
    weight: '-70',
    birthYearRangeStart: '0000',
    birthYearRangeEnd: '1994',
  },
  {
    id: '7d8fk1jsg0mpev29',
    category: '어덜트',
    uniform: '기',
    gender: 'FEMALE',
    belt: '블랙',
    weight: '-58',
    birthYearRangeStart: '1900',
    birthYearRangeEnd: '9999',
  },
];

type OptionType = 'uniform' | 'category' | 'belt' | 'weight';

export default function ChooseDivisionPage({
  onNext,
  playerInfo,
  selectedDivision,
  setDivision,
  setDivisionId,
}: {
  onNext: () => void;
  playerInfo: PlayerInfo;
  selectedDivision: SelectedOptions[];
  setDivision: (selectedDivision: SelectedOptions[]) => void;
  setDivisionId: (selectedDicisionId: any) => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions[]>(selectedDivision);

  const cur = selectedOptions.length - 1;
  const optionKeys: OptionType[] = ['uniform', 'category', 'belt', 'weight'];
  const nextOption: OptionType | undefined = optionKeys.find((key) => !selectedOptions[cur][key]);

  // selectedOptions[cur]을 기준으로 변경
  const filteredDivisions = divisions.filter(
    (division) =>
      (!selectedOptions[cur].uniform || division.uniform === selectedOptions[cur].uniform) &&
      (!selectedOptions[cur].category || division.category === selectedOptions[cur].category) &&
      (!selectedOptions[cur].belt || division.belt === selectedOptions[cur].belt) &&
      (!selectedOptions[cur].weight || division.weight === selectedOptions[cur].weight),
  );

  const optionsToShow = nextOption
    ? [...new Set(filteredDivisions.map((division) => division[nextOption]))].sort()
    : [];

  // 옵션 선택 처리 => 타입에러 발생에 따른 2가지 해결책
  // 1. 옵션 선택 처리 => 타입에러 발생
  // const handleOptionSelect = (optionType: OptionType, value: string) => {
  //   if (selectedOptions.length === 0 || selectedOptions[cur][optionType]) {
  //     setSelectedOptions([...selectedOptions, { [optionType]: value }]);
  //   } else {
  //     setSelectedOptions((prev) => [...prev.slice(0, -1), { ...prev[cur], [optionType]: value }]);
  //   }
  // };

  // 2. 옵션 선택 처리 => 타입에러 해결1
  // const handleOptionSelect = (optionType: OptionType, value: string) => {
  //   if (selectedOptions.length === 0 || selectedOptions[cur][optionType]) {
  //     // 새 옵션을 직접 생성하고 SelectedOptions 타입으로 단언
  //     const newOption: SelectedOptions = { ...selectedOptions[cur], [optionType]: value } as SelectedOptions;
  //     setSelectedOptions([...selectedOptions, newOption]);
  //   } else {
  //     // 이전 상태를 수정하며 SelectedOptions 타입으로 단언
  //     setSelectedOptions((prev) => {
  //       const newOptions = [...prev.slice(0, -1)];
  //       const updatedOption: SelectedOptions = { ...prev[cur], [optionType]: value } as SelectedOptions;
  //       newOptions.push(updatedOption);
  //       return newOptions;
  //     });
  //   }
  // };

  // 3. 옵션 선택 처리 => 타입에러 해결2
  const handleOptionSelect = (optionType: OptionType, value: string) => {
    // 먼저 변경하려는 키와 값을 새 객체에 설정
    const updatedValues = {
      ...selectedOptions[cur],
      [optionType]: value, // 새 값을 먼저 적용
    };

    // 모든 필수 필드를 포함한 새 옵션 객체를 생성
    const newOption: SelectedOptions = {
      uniform: updatedValues.uniform || '', // 기본값으로 fallback
      category: updatedValues.category || '',
      belt: updatedValues.belt || '',
      weight: updatedValues.weight || '',
    };

    if (selectedOptions.length === 0 || selectedOptions[cur][optionType]) {
      setSelectedOptions([...selectedOptions, newOption]);
    } else {
      setSelectedOptions((prev) => [...prev.slice(0, -1), newOption]);
    }
  };

  // 선택 항목 삭제 처리
  const handleDeleteOption = (index: number) => {
    const newOptions = selectedOptions.filter((_, i) => i !== index);
    setSelectedOptions(newOptions);
  };

  // 이전 버튼 클릭 시
  const handleGoBack = () => {
    if (selectedOptions.length > 0) {
      const newOptions = [...selectedOptions];
      const currentOptions = newOptions[newOptions.length - 1]; // 현재 선택 옵션을 참조

      // 현재 설정해야 할 옵션을 결정
      const nextOption = optionKeys.find((key) => !currentOptions[key]);

      // 'uniform'을 설정해야 하는 상태에서 이전 버튼을 눌렀을 때 작동하지 않도록
      if (nextOption === 'uniform') {
        return; // 아무 동작도 하지 않고 함수를 종료
      }

      // 다음 설정해야 할 옵션 이외의 최근 설정된 옵션을 삭제
      if (currentOptions) {
        const optionKeysReversed = optionKeys.slice().reverse();
        let keyRemoved = false;
        for (const key of optionKeysReversed) {
          if (currentOptions[key] && key !== nextOption) {
            delete currentOptions[key]; // 마지막으로 추가된 옵션 삭제
            keyRemoved = true;
            break;
          }
        }

        // 변경된 옵션이 있으면 상태 업데이트
        if (keyRemoved) {
          newOptions[newOptions.length - 1] = currentOptions; // 수정된 현재 옵션을 업데이트
        }
      }

      // 결과를 상태에 반영
      setSelectedOptions(newOptions);
    }
  };

  // 선택 옵션을 초기화하는 함수
  const handleRefresh = () => {
    setSelectedOptions((prev) => [
      ...prev.slice(0, -1),
      { uniform: '', category: '', belt: '', weight: '' },
    ]);
  };

  // 선택 항목에서 빈 값이 있는지 검사하고 제거하는 함수
  const cleanUpOptions = () => {
    // 빈 옵션이 있는지 먼저 확인
    const hasIncompleteOptions = selectedOptions.some(
      (option) => !option.uniform || !option.category || !option.belt || !option.weight,
    );

    // 빈 옵션이 있다면 경고 메시지 표시
    if (hasIncompleteOptions) {
      alert('선택이 완료되지 않은 부문은 삭제됩니다.');
    }

    // 빈 옵션이 없는 항목만 필터링
    const filteredOptions = selectedOptions.filter(
      (option) => option.uniform && option.category && option.belt && option.weight,
    );
    setSelectedOptions(filteredOptions);
  };

  const handleNext = () => {
    // 선택된 옵션이 2개 이상일 때만 빈 옵션을 정리
    if (selectedOptions.length > 1) {
      cleanUpOptions();
    }

    // 모든 필드가 채워진 옵션만을 처리
    const completeSelectedOptions = selectedOptions.filter(
      (option) => option.uniform && option.category && option.belt && option.weight,
    );

    // 완전히 선택된 옵션이 없을 경우 경고
    if (completeSelectedOptions.length === 0) {
      alert('모든 옵션을 선택해주세요.');
      return; // 함수 실행을 중단
    }

    // 선택된 옵션들을 바탕으로 대회 ID 찾기
    const selectedIds = completeSelectedOptions
      .map((option) => {
        const match = divisions.find(
          (division) =>
            division.uniform === option.uniform &&
            division.category === option.category &&
            division.belt === option.belt &&
            division.weight === option.weight,
        );
        return match ? match.id : null;
      })
      .filter((id) => id !== null); // null이 아닌 ID만 필터링

    console.log(completeSelectedOptions);
    console.log(selectedIds);
    setDivision(completeSelectedOptions); // 선택된 옵션 상태 업데이트
    setDivisionId(selectedIds); // 선택된 옵션에 해당되는 대회 ID 상태 업데이트

    onNext(); // 다음 페이지 또는 다음 단계로 진행
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.playerInfoList}>
          <div>{playerInfo.name}</div>
          <div>{playerInfo.gender}</div>
          <div>{playerInfo.birth}</div>
          <div>{playerInfo.belt}</div>
        </div>
        <div className={styles.divisionColumn}>
          <div>기/노기</div>
          <div>부문</div>
          <div>벨트</div>
          <div>체급</div>
        </div>
        {selectedOptions.map((division, index) => (
          <div className={styles.divisionRow}>
            <div>{division.uniform || '-'}</div>
            <div>{division.category || '-'}</div>
            <div>{division.belt || '-'}</div>
            <div>{division.weight || '-'}</div>
            {selectedOptions.length > 1 && (
              <div className={styles.divisionDelete} onClick={() => handleDeleteOption(index)}>
                <IconClose />
              </div>
            )}
          </div>
        ))}
        <div className={styles.chooseDivisonBox}>
          <div className={styles.chooseDivisonBoxHeader}>
            <div className={styles.icon} onClick={handleGoBack}>
              <IconNavigateBefore />
              <div className={styles.iconComment}>이전</div>
            </div>
            <div className={styles.icon} onClick={handleRefresh}>
              <IconRefresh />
              <div className={styles.iconComment}>초기화</div>
            </div>
          </div>
          <div className={styles.divisionOptionCardList}>
            {optionsToShow.map((option) => (
              <div
                key={option}
                className={styles.divisionOptionCard}
                onClick={() => (nextOption ? handleOptionSelect(nextOption, option) : null)}
              >
                {option}
              </div>
            ))}
            {!nextOption && (
              <div
                className={styles.divisionOptionFullCard}
                onClick={() =>
                  setSelectedOptions([
                    ...selectedOptions,
                    { uniform: '', category: '', belt: '', weight: '' },
                  ])
                }
              >
                부문추가
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
