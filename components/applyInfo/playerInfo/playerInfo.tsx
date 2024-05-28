import styles from './index.module.scss';

interface PlayerInfoProps {
  name: string;
  phoneNumber: string;
}

export default function PlayerInfo({ name, phoneNumber }: PlayerInfoProps) {
  return (
    <div className={styles.block}>
      <div className={styles.title}>신청인</div>
      <div className={styles.row}>
        <div className={styles.subtitle}>이름</div>
        <div className={styles.content}>{name}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitle}>전화번호</div>
        <div className={styles.content}>{phoneNumber}</div>
      </div>
    </div>
  );
}
