import styles from './index.module.scss';

export function Divider() {
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.divider}></div>
    </div>
  );
}

export function ThinDivider() {
  return (
    <div className={styles.thinDividerContainer}>
      <div className={styles.thinDivider}></div>
    </div>
  );
}
