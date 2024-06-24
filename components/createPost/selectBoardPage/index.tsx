import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';

type Category = 'FREE' | 'COMPETITION' | 'SEMINAR' | 'OPENMAT';

interface selectBoardPageProps {
  categorys: Category[];
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const categorysKr = {
  FREE: '자유',
  COMPETITION: '대회',
  SEMINAR: '세미나',
  OPENMAT: '오픈매트',
};

export default function SelectBoardPage({
  categorys,
  setSelectedCategory,
  selectedCategory,
}: selectBoardPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>어디에 게시할까요?</div>
      {categorys.map((category) => (
        <RadioButtonLabel
          key={category}
          msg={categorysKr[category]}
          isChecked={selectedCategory === category}
          changeCheck={() => setSelectedCategory(category)}
          isUnderlined={true}
        />
      ))}
    </div>
  );
}
