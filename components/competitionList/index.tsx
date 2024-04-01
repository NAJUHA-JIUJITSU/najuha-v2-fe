'use client';

import styles from './index.module.scss';
import Card from '@/components/card';
import { useGetCompetitions, useGetFilteredCompetitions } from '@/hooks/competition';

const competitionList = [
  {
    earlybirdDiscountSnapshots: [
      {
        id: 1,
        createdAt: '2024-03-01',
        earlybirdStartDate: '2024-03-10',
        earlybirdEndDate: '2024-03-20',
        discountAmount: 0,
        competitionId: 0,
      },
    ],
    id: 1,
    status: 'ACTIVE',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-25',
    title: '제 1회 대한민국 개발자 대회',
    address: '서울특별시 강남구 테헤란로',
    competitionDate: '2024-04-15',
    registrationStartDate: '2024-03-10',
    registrationEndDate: '2024-03-31',
    refundDeadlineDate: '2024-04-01',
    soloRegistrationAdjustmentStartDate: '2024-04-02',
    soloRegistrationAdjustmentEndDate: '2024-04-05',
    registrationListOpenDate: '2024-04-06',
    bracketOpenDate: '2024-04-08',
    description:
      '대한민국 개발자들을 위한 대회로, 다양한 분야에서 실력을 겨루는 이벤트입니다. 참가자들은 최신 기술 트렌드와 혁신적인 아이디어를 공유할 수 있는 기회를 가집니다.',
    isPartnership: true,
    viewCount: 1234,
    posterImgUrlKey: '/images/samplePoster1.png',
  },
  {
    earlybirdDiscountSnapshots: [
      {
        id: 2,
        createdAt: '2024-03-01',
        earlybirdStartDate: '2024-03-10',
        earlybirdEndDate: '2024-03-20',
        discountAmount: 0,
        competitionId: 0,
      },
    ],
    id: 2,
    status: 'ACTIVE',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-25',
    title: '제 1회 대한민국 개발자 대회',
    address: '서울특별시 강남구 테헤란로',
    competitionDate: '2024-04-15',
    registrationStartDate: '2024-03-10',
    registrationEndDate: '2024-03-31',
    refundDeadlineDate: '2024-04-01',
    soloRegistrationAdjustmentStartDate: '2024-04-02',
    soloRegistrationAdjustmentEndDate: '2024-04-05',
    registrationListOpenDate: '2024-04-06',
    bracketOpenDate: '2024-04-08',
    description:
      '대한민국 개발자들을 위한 대회로, 다양한 분야에서 실력을 겨루는 이벤트입니다. 참가자들은 최신 기술 트렌드와 혁신적인 아이디어를 공유할 수 있는 기회를 가집니다.',
    isPartnership: true,
    viewCount: 1234,
    posterImgUrlKey: '/images/samplePoster1.png',
  },
];

interface CompetitionListProps {
  dateFilter: string;
  locationFilter: string;
  selectOption: string[];
  sortOption: string;
}

export default function CompetitionList({
  dateFilter,
  locationFilter,
  selectOption,
  sortOption,
}: CompetitionListProps) {
  const { data: competitionListHook } = useGetFilteredCompetitions(
    dateFilter,
    locationFilter,
    selectOption,
    sortOption,
  ); //todo: 초기값 설정 필요

  console.log('대회 리스트: ', competitionListHook);

  return (
    <div className={styles.wrapper}>
      <h1>{dateFilter}</h1>
      <h1>{locationFilter}</h1>
      <h1>{selectOption}</h1>
      <h1>{sortOption}</h1>
      {competitionList.map((competition) => (
        <Card key={competition.id} type="normal" competition={competition} />
      ))}
    </div>
  );
}
