import styles from './index.module.scss';

export default function Divider() {
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.divider}></div>
    </div>
  );
}
