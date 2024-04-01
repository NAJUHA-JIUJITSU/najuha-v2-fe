import styles from './index.module.scss';
import clsx from 'clsx';
import TagList from '@/components/tagList';
import { formatDateYMD, formatDateMDWeekday } from '@/utils/dateUtils/dateFormat';
import { areBothDatesPassed } from '@/utils/dateUtils/dateCheck';
import { CompetitionInfo } from '@/interfaces/CompetitionInfo';

type CardType = 'normal' | 'vertical';

interface CardProps {
  type: CardType;
  competition: CompetitionInfo;
}

//todo: image 최적화
export default function Card({ type = 'normal', competition }: CardProps) {
  //타입이 normal이거나 가격이 없으면 가격 표시 안함
  let isPrice = false;
  // if (type === 'normal' || !info.price) {
  //   isPrice = false;
  // }

  //신청날짜와 단독출전조정기간 모두 이미 지났으면 disabled
  const disabled = areBothDatesPassed(
    competition.registrationEndDate,
    competition.soloRegistrationAdjustmentEndDate,
  );

  return (
    <div
      className={clsx(
        styles.card,
        { [styles.vertical]: type === 'vertical' },
        { [styles.disabled]: disabled },
      )}
    >
      <div className={styles.posterSection}>
        {/* 포스터 이미지 및 기타 정보 표시 */}
        <img className={styles.posterImg} src={competition.posterImgUrlKey}></img>
        <div className={styles.shadowInfo}>
          <p className={styles.viewCnt}>123</p>
          <p className={styles.competitionDate}>
            {formatDateMDWeekday(competition.competitionDate)}
          </p>
        </div>
      </div>
      <div className={styles.detailSection}>
        {/* 태그 및 대회 정보 표시 */}
        <div className={styles.tags}>
          <TagList
            competiton={{
              registrationStartDate: competition.registrationStartDate,
              registrationEndDate: competition.registrationEndDate,
              isPartnership: competition.isPartnership,
              soloRegistrationAdjustmentStartDate: competition.soloRegistrationAdjustmentStartDate,
              soloRegistrationAdjustmentEndDate: competition.soloRegistrationAdjustmentEndDate,
            }}
          />
        </div>
        <h1 className={styles.title}>{competition.title}</h1>
        <h2 className={styles.location}>{competition.address}</h2>
        <div className={clsx(styles.bottom, { [styles.noPrice]: !isPrice })}>
          <h3 className={styles.applyDate}>
            신청기간 ~{formatDateYMD(competition.registrationEndDate)}
          </h3>
          {/* <p className={styles.price}>
            {competition.price}
            <span>원</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}
