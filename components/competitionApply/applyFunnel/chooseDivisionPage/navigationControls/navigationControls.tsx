import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import IconRefresh from '@/public/svgs/refresh.svg';
import styles from './index.module.scss';

export const NavigationControls = ({
  onBack,
  onRefresh,
}: {
  onBack: () => void;
  onRefresh: () => void;
}) => (
  <div className={styles.chooseDivisonBoxHeader}>
    <div className={styles.icon} onClick={onBack}>
      <IconNavigateBefore />
      <div className={styles.iconComment}>이전</div>
    </div>
    <div className={styles.icon} onClick={onRefresh}>
      <IconRefresh />
      <div className={styles.iconComment}>초기화</div>
    </div>
  </div>
);
