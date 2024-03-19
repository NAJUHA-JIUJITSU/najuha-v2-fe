import styles from './index.module.scss';
import clsx from 'clsx';
import TagList from '@/components/tagList';
import { formatDateYMD, formatDateMDWeekday } from '@/util/dateFormat';
import { areBothDatesPassed } from '@/util/dateCheck';
import { CompetitionInfo } from '@/interfaces/CompetitionInfo';

type CardType = 'normal' | 'vertical';

interface CardProps {
  type: CardType;
  info: CompetitionInfo;
}

//todo: image 최적화
export default function Card({ type = 'normal', info }: CardProps) {
  //타입이 normal이거나 가격이 없으면 가격 표시 안함
  let isPrice = true;
  if (type === 'normal' || !info.price) {
    isPrice = false;
  }

  //신청날짜와 단독출전조정기간 모두 이미 지났으면 disabled
  const disabled = areBothDatesPassed(
    info.registrationEndDate,
    info.soloRegistrationAdjustmentEndDate,
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
        <img className={styles.posterImg} src={info.posterImg}></img>
        <div className={styles.shadowInfo}>
          <p className={styles.viewCnt}>123</p>
          <p className={styles.date}>{formatDateMDWeekday(info.date)}</p>
        </div>
      </div>
      <div className={styles.detailSection}>
        {/* 태그 및 대회 정보 표시 */}
        <div className={styles.tags}>
          <TagList
            info={{
              registrationStartDate: info.registrationStartDate,
              registrationEndDate: info.registrationEndDate,
              easyPayAvailable: info.easyPayAvailable,
              soloRegistrationAdjustmentStartDate: info.soloRegistrationAdjustmentStartDate,
              soloRegistrationAdjustmentEndDate: info.soloRegistrationAdjustmentEndDate,
            }}
          />
        </div>
        <h1 className={styles.title}>{info.title}</h1>
        <h2 className={styles.location}>{info.address}</h2>
        <div className={clsx(styles.bottom, { [styles.noPrice]: !isPrice })}>
          <h3 className={styles.applyDate}>신청기간 ~{formatDateYMD(info.registrationEndDate)}</h3>
          <p className={styles.price}>
            {info.price}
            <span>원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
