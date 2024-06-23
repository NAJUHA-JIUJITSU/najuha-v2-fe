import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';

interface selectBoardPageProps {
  boards: string[];
  selectedBoard: string;
  setSelectedBoard: (board: string) => void;
}

export default function SelectBoardPage({
  boards,
  setSelectedBoard,
  selectedBoard,
}: selectBoardPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>어디에 게시할까요?</div>
      {boards.map((board) => (
        <RadioButtonLabel
          key={board}
          msg={board}
          isChecked={selectedBoard === board}
          changeCheck={() => setSelectedBoard(board)}
          isUnderlined={true}
        />
      ))}
    </div>
  );
}
