'use client';
import styles from './index.module.scss';
import Card from '@/components/card';
import { useGetFilteredCompetitions } from '@/hooks/competition';

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
  const {
    data: competitionList = [],
    isLoading,
    isError,
  } = useGetFilteredCompetitions(dateFilter, locationFilter, selectOption, sortOption);

  console.log('대회 리스트: ', competitionList);
  console.log('정렬: ', sortOption);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>대회정보가 없습니다.</div>;

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
