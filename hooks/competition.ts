import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { competitionApi } from '@/api/nestia/competitionApi';
import { CompetitionListProps } from '@/interfaces/competitionList';

//Todo: 무한스크롤 구현
//전체 대회 목록 조회
export const useGetCompetitions = () => {
  return useQuery({
    queryKey: queries.competition.all().queryKey,
    queryFn: () => competitionApi.getCompetitions(),
    // select: competitionsSelectFn,
  });
};

//필터 및 정렬된 대회 목록 조회

export const useGetFilteredCompetitions = ({
  dateFilter,
  locationFilter,
  selectFilter,
  sortOption,
}: CompetitionListProps) => {
  const fetchCompetitions = async ({ pageParam }: { pageParam: number }) => {
    const response = await competitionApi.getFilteredCompetitions({
      page: pageParam,
      limit: 10, // limit
      dateFilter,
      locationFilter,
      selectFilter,
      sortOption,
    });
    return response;
  };

  return useInfiniteQuery({
    queryKey: queries.competition.filtered(dateFilter, locationFilter, selectFilter, sortOption)
      .queryKey,
    queryFn: fetchCompetitions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

//특정 대회 조회
export const useGetCompetitionId = (competitionId: string) => {
  return useQuery({
    queryKey: queries.competition.id(competitionId).queryKey,
    queryFn: () => competitionApi.getCompetitionId(competitionId),
  });
};
