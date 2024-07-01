import { ICompetition } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import styles from './index.module.scss';

interface CompetitionBannerProps {
  posterImg: string;
  viewCnt: ICompetition['viewCount'];
}

export default function CompetitionBanner(props: CompetitionBannerProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundImg}>
        <img className={styles.posterImg} src={props.posterImg} alt="대회 포스터" />
      </div>
      <div className={styles.posterSection}>
        <img className={styles.posterImg} src={props.posterImg} alt="대회 포스터" />
        <div className={styles.viewCnt}>조회 {props.viewCnt}</div>
      </div>
    </div>
  );
}
