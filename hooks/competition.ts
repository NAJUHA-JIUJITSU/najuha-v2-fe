import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { competitionApi } from '@/api/competitionApi';
import {
  ApiCompetitionsResponse,
  ApiCompetitionIdResponse,
  ApiInfiniteCompetitionsResponse,
} from '@/interfaces/CompetitionInfo';

// competitions select 함수 정의
const competitionsSelectFn = (response: ApiCompetitionsResponse) => {
  return response.data.result.competitions;
};

// competition select 함수 정의
const competitionIdSelectFn = (response: ApiCompetitionIdResponse) => {
  return response.data.result.competition;
};

//Todo: 무한스크롤 구현
//전체 대회 목록 조회
export const useGetCompetitions = () => {
  return useQuery({
    queryKey: queries.competition.all().queryKey,
    queryFn: () => competitionApi.getCompetitions(),
    select: competitionsSelectFn,
  });
};

//필터 및 정렬된 대회 목록 조회
export const useGetFilteredCompetitions = (
  dateFilter: string,
  locationFilter: string,
  selectFilter: string[],
  sortOption: string,
  limit: number = 10,
) => {
  const fetchCompetitions = async ({ pageParam }: { pageParam: number }) => {
    const response: ApiInfiniteCompetitionsResponse = await competitionApi.getFilteredCompetitions(
      pageParam,
      limit,
      dateFilter,
      locationFilter,
      selectFilter,
      sortOption,
    );
    return response.data.result;
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
export const useGetCompetitionId = (competitionId: number) => {
  return useQuery({
    queryKey: queries.competition.id(competitionId).queryKey,
    queryFn: () => competitionApi.getCompetitionId(competitionId),
    select: competitionIdSelectFn,
  });
};
