import styles from './index.module.scss';
import clsx from 'clsx';

//todo: image 최적화
export default function Card() {
  const vertical = false;
  const isPrice = true;
  const price = '50,000';

  return (
    <div className={clsx(styles.card, { [styles.vertical]: vertical })}>
      <div className={styles.posterSection}>
        <img className={styles.posterImg} src="/images/samplePoster1.png"></img>
        <div className={styles.shadowInfo}>
          <p className={styles.viewCnt}>123</p>
          <p className={styles.date}>08.27 (월)</p>
        </div>
      </div>
      <div className={styles.detailSection}>
        <div className={styles.tags}>
          <div className={`${styles.tag} ${styles.ealryBird}`}>얼리버드</div>
          <div className={`${styles.tag} ${styles.easyPay}`}>간편결제</div>
        </div>
        <h1 className={styles.title}>제 2회 서브미션 리그</h1>
        <h2 className={styles.location}>송도, 글로벌 캠퍼스 양도로 113-101</h2>
        <div className={clsx(styles.bottom, { [styles.noPrice]: !isPrice })}>
          <h3 className={styles.applyDate}>2023.10.03~11.19</h3>
          <p className={styles.price}>
            {price}
            <span>원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
