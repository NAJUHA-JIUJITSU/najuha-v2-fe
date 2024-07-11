import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import { IPostDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/post.interface';

interface selectBoardPageProps {
  categories: IPostDetail['category'][];
  selectedCategory: IPostDetail['category'];
  setSelectedCategory: (category: IPostDetail['category']) => void;
}

const categoriesKr = {
  FREE: '자유',
  COMPETITION: '대회',
  SEMINAR: '세미나',
  OPEN_MAT: '오픈매트',
};

export default function SelectBoardPage({
  categories,
  setSelectedCategory,
  selectedCategory,
}: selectBoardPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>어디에 게시할까요?</div>
      {categories.map((categories) => (
        <RadioButtonLabel
          key={categories}
          msg={categoriesKr[categories]}
          isChecked={selectedCategory === categories}
          changeCheck={() => setSelectedCategory(categories)}
          isUnderlined={true}
        />
      ))}
    </div>
  );
}
