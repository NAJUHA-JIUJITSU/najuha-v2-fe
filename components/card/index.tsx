import styles from './index.module.scss';
import clsx from 'clsx';
import TagList from '@/components/tagList';

type CardType = 'normal' | 'vertical';

interface CardProps {
  type: CardType;
  info: {
    id: number;
    title: string;
    address: string;
    date: Date;
    registrationStartDate: Date;
    registrationEndDate: Date;
    refundDeadlineDate: Date;
    soloRegistrationAdjustmentStartDate: Date;
    soloRegistrationAdjustmentEndDate: Date;
    price?: number;
    viewCnt: number;
    posterImg: string;
    easyPayAvailable: boolean;
  };
}

//todo: image 최적화
export default function Card({ type = 'normal', info }: CardProps) {
  const isPrice = true;

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }

  return (
    <div className={clsx(styles.card, { [styles.vertical]: type === 'vertical' })}>
      <div className={styles.posterSection}>
        <img className={styles.posterImg} src={info.posterImg}></img>
        <div className={styles.shadowInfo}>
          <p className={styles.viewCnt}>123</p>
          <p className={styles.date}>{formatDate(info.date)}</p>
        </div>
      </div>
      <div className={styles.detailSection}>
        <div className={styles.tags}>
          <TagList
            info={{
              registrationStartDate: info.registrationStartDate,
              registrationEndDate: info.registrationEndDate,
              easyPayAvailable: info.easyPayAvailable,
            }}
          />
        </div>

        <h1 className={styles.title}>{info.title}</h1>
        <h2 className={styles.location}>{info.address}</h2>
        <div className={clsx(styles.bottom, { [styles.noPrice]: !isPrice })}>
          <h3 className={styles.applyDate}>
            {formatDate(info.registrationStartDate)}~{formatDate(info.registrationEndDate)}
          </h3>
          <p className={styles.price}>
            {info.price}
            <span>원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
