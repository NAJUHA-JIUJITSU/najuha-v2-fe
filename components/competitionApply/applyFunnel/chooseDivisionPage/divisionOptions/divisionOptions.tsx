import styles from './index.module.scss';
import { SelectedOptions } from '@/interfaces/competitionApply';

export const DivisionOptions = ({
  optionsToShow,
  nextOption,
  handleOptionSelect,
  handleAddNewOption,
}: {
  optionsToShow: string[];
  nextOption: keyof SelectedOptions | null;
  handleOptionSelect: (optionType: keyof SelectedOptions, value: string) => void;
  handleAddNewOption: () => void;
}) => (
  <div className={styles.divisionOptionCardList}>
    {optionsToShow.map((option) => (
      <div
        key={option}
        className={styles.divisionOptionCard}
        onClick={() => nextOption && handleOptionSelect(nextOption, option)}
      >
        {option}
      </div>
    ))}
    {!nextOption && (
      <div className={styles.divisionOptionFullCard} onClick={handleAddNewOption}>
        부문추가
      </div>
    )}
  </div>
);
