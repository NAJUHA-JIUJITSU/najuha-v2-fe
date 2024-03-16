import styles from './index.module.scss';
import Card from '@/components/card';

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
  sortOption: string;
  dateFilter: string;
}

// async function fetchFilteredCompetitions(sortOption: string, dateFilter: string) {
//   // 서버 또는 API에서 필터링 및 정렬 옵션에 맞는 데이터를 가져오는 로직 구현
//   const response = await fetch(`/competitions?sort=${sortOption}&date=${dateFilter}`);
//   const data = await response.json();
//   return data;
// }

export default function CompetitionList({ sortOption, dateFilter }: CompetitionListProps) {
  // const FetchCompetitionList = await fetchFilteredCompetitions(sortOption, dateFilter);

  return (
    <div className={styles.wrapper}>
      <h1>{sortOption}</h1>
      <h1>{dateFilter}</h1>
      {competitionList.map((competition) => (
        <Card key={competition.id} type="normal" info={competition} />
      ))}
    </div>
  );
}
