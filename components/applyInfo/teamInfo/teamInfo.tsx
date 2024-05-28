import styles from './index.module.scss';

interface TeamInfoProps {
  network: string;
  team: string;
  masterName: string;
}

export default function TeamInfo({ network, team, masterName }: TeamInfoProps) {
  return (
    <div className={styles.block}>
      <div className={styles.title}>소속</div>
      <div className={styles.row}>
        <div className={styles.subtitle}>소속 네트워크</div>
        <div className={styles.content}>{network}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitle}>소속 팀</div>
        <div className={styles.content}>{team}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.subtitle}>관장님 성함</div>
        <div className={styles.content}>{masterName}</div>
      </div>
    </div>
  );
}
