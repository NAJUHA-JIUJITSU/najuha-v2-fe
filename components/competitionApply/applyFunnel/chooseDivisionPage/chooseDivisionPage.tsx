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

export default function ChooseDivisionPage({
  onNext,
  playerInfo,
  selectedDivision,
  divisions,
  setDivision,
  setDivisionId,
}: {
  onNext: () => void;
  playerInfo: PlayerInfo;
  selectedDivision: SelectedOptions[];
  divisions: Division[];
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
  const { optionsToShow, nextOption } = useDivisionFilter(divisions, selectedOptions, playerInfo);

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
