import styles from './index.module.scss';

interface Division {
  uniform: string;
  belt: string;
  category: string;
  weight: string;
}

interface ParticipantInfoProps {
  name: string;
  gender: string;
  birth: string;
  belt: string;
  divisions: Division[];
}

export default function ParticipantInfo({
  name,
  gender,
  birth,
  belt,
  divisions,
}: ParticipantInfoProps) {
  return (
    <div className={styles.block}>
      <div className={styles.title}>참가선수</div>
      <div className={styles.selectedDivision}>
        <div className={styles.player}>
          {name} {gender} {birth} {belt}
        </div>
        <div className={styles.divisions}>
          {divisions.map((division, index) => (
            <div key={index} className={styles.division}>
              <div className={styles.category}>{division.uniform}</div>
              <div className={styles.category}>{division.belt}</div>
              <div className={styles.category}>{division.category}</div>
              <div className={styles.category}>{division.weight}</div>
            </div>
          ))}
        </div>
        <div className={styles.price}>50,000원</div>
      </div>
    </div>
  );
}
