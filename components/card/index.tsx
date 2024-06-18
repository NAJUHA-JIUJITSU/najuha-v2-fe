'use client';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import TagList from '@/components/tagList';
import { formatDateYMD, formatDateMDWeekday } from '@/utils/dateUtils/dateFormat';
import { areBothDatesPassed } from '@/utils/dateUtils/dateCheck';
import Image from 'next/image';
import IconEye from '@/public/svgs/eye.svg';
import { ICompetitionSummary } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

type CardType = 'normal' | 'vertical';

interface CardProps {
  type: CardType;
  competition: ICompetitionSummary;
}

//todo: image 최적화
export default function Card({ type = 'normal', competition }: CardProps) {
  const router = useRouter();

  let posterImgUrl = '';
  // imageURL이 없으면 기본 이미지로 대체 나중에 밑에 주석처리된 코드로 변경
  // if (!competition.competitionPosterImages[0].imageId) {
  //   const latest = competition.competitionPosterImages.length - 1;
  //   posterImgUrl = `${s3url}/${competition.competitionPosterImages[latest].imageId}`
  // } else {
  //   posterImgUrl = '/images/samplePoster1.png';
  // }
  posterImgUrl = '/images/samplePoster1.png';

  //타입이 normal이거나 가격이 없으면 가격 표시 안함
  // let isPrice = false;
  // if (type === 'normal' || !info.price) {
  //   isPrice = false;
  // }

  //신청날짜와 단독출전조정기간 모두 이미 지났으면 disabled
  const disabled = areBothDatesPassed(
    competition.registrationEndDate,
    competition.soloRegistrationAdjustmentEndDate,
  );

  // 클릭 시 대회 상세페이지로 이동
  const handleClick = () => {
    router.push(`/competition/${competition.id}`);
  };

  return (
    <div
      className={clsx(
        styles.card,
        { [styles.vertical]: type === 'vertical' },
        { [styles.disabled]: disabled },
      )}
      onClick={handleClick}
    >
      <div className={styles.posterSection}>
        {/* 포스터 이미지 및 기타 정보 표시 */}
        <Image
          className={styles.posterImg}
          src={posterImgUrl}
          alt={competition.title}
          width={100}
          height={100}
          priority={true}
        ></Image>
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
