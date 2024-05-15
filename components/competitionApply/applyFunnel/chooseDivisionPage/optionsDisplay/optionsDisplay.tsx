import { SelectedOptions } from '@/interfaces/competitionApply';
import styles from './index.module.scss';
import IconClose from '@/public/svgs/closeSmall.svg';

export const OptionsDisplay = ({
  options,
  onDelete,
}: {
  options: SelectedOptions[];
  onDelete: (index: number) => void;
}) => (
  <>
    {options.map((option, index) => (
      <div className={styles.divisionRow} key={index}>
        <div>{option.uniform || '-'}</div>
        <div>{option.category || '-'}</div>
        <div>{option.belt || '-'}</div>
        <div>{option.weight || '-'}</div>
        {options.length > 1 && (
          <div className={styles.divisionDelete} onClick={() => onDelete(index)}>
            <IconClose />
          </div>
        )}
      </div>
    ))}
  </>
);
