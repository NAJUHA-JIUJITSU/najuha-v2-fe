'use client';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import TagList from '@/components/tagList';
import { formatDateYMD, formatDateMDWeekday } from '@/utils/dateUtils/dateFormat';
import { areBothDatesPassed } from '@/utils/dateUtils/dateCheck';
import IconEye from '@/public/svgs/eye.svg';
import { ICompetitionSummary } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

type CardType = 'normal' | 'vertical';

interface CardProps {
  type: CardType;
  competition: ICompetitionSummary;
}

const getPosterImageUrl = (competition: ICompetitionSummary): string => {
  if (competition.competitionPosterImages.length > 0) {
    const latest = competition.competitionPosterImages.length - 1;
    return `http://localhost:9000/najuha-v2-bucket/${competition.competitionPosterImages[latest].image.path}/${competition.competitionPosterImages[latest].image.id}`;
  }
  return '/images/samplePoster1.png';
};

export default function Card({ type = 'normal', competition }: CardProps) {
  const router = useRouter();
  const posterImgUrl = getPosterImageUrl(competition);
  const isCompetitionDisabled = areBothDatesPassed(
    competition.registrationEndDate,
    competition.soloRegistrationAdjustmentEndDate,
  );
  // 클릭 시 대회 상세페이지로 이동
  const handleClick = () => {
    router.push(`/competition/${competition.id}`);
  };

  // 세미나, 오픈매트 추가하면 isPrice 추가
  // let isPrice = false;
  // if (type === 'normal' || !info.price) {
  //   isPrice = false;
  // }

  return (
    <div
      className={clsx(
        styles.card,
        { [styles.vertical]: type === 'vertical' },
        { [styles.disabled]: isCompetitionDisabled },
      )}
      onClick={handleClick}
    >
      <div className={styles.posterSection}>
        {/* 포스터 이미지 및 기타 정보 표시 */}
        <img className={styles.posterImg} src={posterImgUrl} alt={competition.title}></img>
        <div className={styles.shadowInfo}>
          <p className={styles.viewCnt}>
            <IconEye />
            {competition.viewCount}
          </p>
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
              ealryBirdStartDate:
                competition.earlybirdDiscountSnapshots[
                  competition.earlybirdDiscountSnapshots.length - 1
                ]?.earlybirdStartDate,
              ealryBirdEndDate:
                competition.earlybirdDiscountSnapshots[
                  competition.earlybirdDiscountSnapshots.length - 1
                ]?.earlybirdEndDate,
            }}
          />
        </div>
        <h1 className={styles.title}>{competition.title}</h1>
        <h2 className={styles.location}>{competition.address}</h2>
        <div className={styles.bottom}>
          {/* 가격추가 clsx(styles.bottom, { [styles.noPrice]: !isPrice } */}
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
