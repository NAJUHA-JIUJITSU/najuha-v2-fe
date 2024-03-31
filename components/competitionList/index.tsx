'use client';

import styles from './index.module.scss';
import Card from '@/components/card';
import { useGetCompetitions, useGetFilteredCompetitions } from '@/hooks/competition';

const competitionList = [
  {
    id: 1,
    title: '제 1회 대한민국 코딩대회',
    address: '서울특별시 강남구',
    date: new Date('2024-04-01'),
    registrationStartDate: new Date('2024-03-10'),
    registrationEndDate: new Date('2024-03-21'),
    refundDeadlineDate: new Date('2024-03-21'),
    soloRegistrationAdjustmentStartDate: new Date('2024-03-21'),
    soloRegistrationAdjustmentEndDate: new Date('2024-03-24'),
    price: 10000,
    viewCnt: 123,
    posterImg: '/images/samplePoster1.png',
    easyPayAvailable: true,
  },
  {
    id: 2,
    title: '제 2회 대한민국 코딩대회',
    address: '서울특별시 강남구',
    date: new Date('2024-09-01'),
    registrationStartDate: new Date('2024-08-01'),
    registrationEndDate: new Date('2024-08-31'),
    refundDeadlineDate: new Date('2024-08-31'),
    soloRegistrationAdjustmentStartDate: new Date('2024-08-31'),
    soloRegistrationAdjustmentEndDate: new Date('2024-08-31'),
    price: 10000,
    viewCnt: 123,
    posterImg: '/images/samplePoster1.png',
    easyPayAvailable: true,
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
  // const { data: competitionListHook } = useGetFilteredCompetitions(
  //   dateFilter,
  //   locationFilter,
  //   selectOption,
  //   sortOption,
  // ); //todo: 초기값 설정 필요

  return (
    <div className={styles.wrapper}>
      <h1>{dateFilter}</h1>
      <h1>{locationFilter}</h1>
      <h1>{selectOption}</h1>
      <h1>{sortOption}</h1>
      {competitionList.map((competition) => (
        <Card key={competition.id} type="normal" info={competition} />
      ))}
    </div>
  );
}
