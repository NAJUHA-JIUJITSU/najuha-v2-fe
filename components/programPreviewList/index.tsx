'use client';
import styles from './index.module.scss';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import { useState } from 'react';
import Card from '@/components/card';
import ButtonLink from '@/components/common/button/buttonLink';

const tagBtnOptions = ['대회', '세미나', '오픈매트'];
const competition = {
  earlybirdDiscountSnapshots: [
    {
      id: 1,
      createdAt: '2024-06-01T00:00:00Z',
      earlybirdStartDate: '2024-06-10T00:00:00Z',
      earlybirdEndDate: '2024-06-20T00:00:00Z',
      discountAmount: 20,
      competitionId: 101,
    },
    {
      id: 2,
      createdAt: '2024-06-01T00:00:00Z',
      earlybirdStartDate: '2024-07-10T00:00:00Z',
      earlybirdEndDate: '2024-07-20T00:00:00Z',
      discountAmount: 15,
      competitionId: 101,
    },
  ],
  id: 101,
  status: 'ACTIVE',
  createdAt: '2024-06-01T00:00:00Z',
  updatedAt: '2024-06-03T00:00:00Z',
  title: '제 1회 나주하 주짓수 대회',
  address: '송도, 글로벌 캠퍼스 스포츠센터',
  competitionDate: '2024-08-15T00:00:00Z',
  registrationStartDate: '2024-06-15T00:00:00Z',
  registrationEndDate: '2024-08-01T00:00:00Z',
  refundDeadlineDate: '2024-07-31T00:00:00Z',
  soloRegistrationAdjustmentStartDate: '2024-06-20T00:00:00Z',
  soloRegistrationAdjustmentEndDate: '2024-06-30T00:00:00Z',
  registrationListOpenDate: '2024-06-05T00:00:00Z',
  bracketOpenDate: '2024-08-05T00:00:00Z',
  description:
    'Join us for the annual coding competition where coders from all over the world compete for the top spot!',
  isPartnership: false,
  viewCount: 2345,
  posterImgUrlKey: '',
};

export default function ProgramPreviewList() {
  const [selectOptionsState, setSelectOptionsState] = useState<string>('대회');

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>요즘 핫해요!</div>
      <div className={styles.programSection}>
        <div className={styles.tagBtnOptionsWrapper}>
          {tagBtnOptions.map((option) => (
            <ButtonOnToggle
              key={option}
              type="tag"
              text={option}
              isToggled={selectOptionsState === option}
              onToggle={() => setSelectOptionsState(option)}
            />
          ))}
        </div>
        <div className={styles.programCardList}>
          <Card type="vertical" competition={competition} />
          <Card type="vertical" competition={competition} />
          <Card type="vertical" competition={competition} />
          <Card type="vertical" competition={competition} />
          <Card type="vertical" competition={competition} />
          <Card type="vertical" competition={competition} />
        </div>
      </div>
      <ButtonLink
        text="대회 전체보기"
        size="medium"
        type="outlined"
        color="gray"
        href="/competition"
        width="full"
      />
    </div>
  );
}
