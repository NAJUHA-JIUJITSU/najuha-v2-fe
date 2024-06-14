import styles from './index.module.scss';
import ProgramCardList from '@/components/programPreviewList/programPreviewCardList';

interface ProgramPreviewListProps {
  title: string;
  selectFilter: string[];
  sortOption: string;
}

export default function ProgramPreviewList({
  title,
  selectFilter,
  sortOption,
}: ProgramPreviewListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <ProgramCardList selectFilter={selectFilter} sortOption={sortOption} />
    </div>
  );
}
