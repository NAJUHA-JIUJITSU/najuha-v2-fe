import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { PlayerInfo, SelectedOptions, Division } from '@/interfaces/competitionApply';
import { useSelectedOptions } from '@/hooks/useSelectedOptions';
import { useDivisionFilter } from '@/hooks/useDivisionFilter';
import { PlayerInfoDisplay } from '@/components/competitionApply/applyFunnel/chooseDivisionPage/playerInfoDisplay/playerInfoDisplay';
import { OptionsDisplay } from './optionsDisplay/optionsDisplay';
import { NavigationControls } from './navigationControls/navigationControls';
import { DivisionOptions } from './divisionOptions/divisionOptions';
import { DivisionHeader } from './divisionHeader/divisionHeader';

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
  const {
    selectedOptions,
    handleOptionSelect,
    handleDeleteOption,
    cleanUpOptions,
    undoLastOptionChange,
    resetLatestOption,
    handleAddNewOption,
  } = useSelectedOptions({
    initialOptions: selectedDivision,
    divisions,
  });
  const { optionsToShow, nextOption } = useDivisionFilter(divisions, selectedOptions);

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
        <PlayerInfoDisplay playerInfo={playerInfo} />
        <DivisionHeader />
        <OptionsDisplay options={selectedOptions} onDelete={handleDeleteOption} />
        <div className={styles.chooseDivisonBox}>
          <NavigationControls onBack={undoLastOptionChange} onRefresh={resetLatestOption} />
          <DivisionOptions
            optionsToShow={optionsToShow}
            nextOption={nextOption}
            handleOptionSelect={handleOptionSelect}
            handleAddNewOption={handleAddNewOption}
          />
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
