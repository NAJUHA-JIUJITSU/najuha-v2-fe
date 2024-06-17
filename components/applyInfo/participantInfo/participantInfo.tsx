import { SelectedOptions } from '@/interfaces/competitionApply';
import styles from './index.module.scss';
import { IPlayerSnapshot } from 'najuha-v2-api/lib/modules/applications/domain/interface/player-snapshot.interface';
import { IApplication } from 'najuha-v2-api/lib/modules/applications/domain/interface/application.interface';

interface ParticipantInfoProps {
  name: IPlayerSnapshot['name'];
  gender: IPlayerSnapshot['gender'];
  birth: IPlayerSnapshot['birth'];
  belt: IPlayerSnapshot['belt'];
  divisions: SelectedOptions[];
  expectedPayment: IApplication['expectedPayment'];
}

export default function ParticipantInfo({
  name,
  gender,
  birth,
  belt,
  divisions,
  expectedPayment,
}: ParticipantInfoProps) {
  // 3자리마다 , 찍기 && 원 표시
  const ParsedExpectedPayment = expectedPayment?.totalAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className={styles.block}>
      <div className={styles.title}>참가선수</div>
      <div className={styles.selectedDivision}>
        <div className={styles.player}>
          {name} {gender === 'FEMALE' ? '여자' : '남자'} {birth} {belt}
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
        <div className={styles.price}>{ParsedExpectedPayment}원</div>
      </div>
    </div>
  );
}
