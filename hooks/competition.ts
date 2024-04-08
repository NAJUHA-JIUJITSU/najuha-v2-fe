import { useQuery, useMutation } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { competitionApi } from '@/api/competitionApi';
import { ApiCompetitionsResponse, ApiCompetitionIdResponse } from '@/interfaces/CompetitionInfo';

// competitions(전체대회목록) select 함수 정의
const competitionsSelectFn = (response: ApiCompetitionsResponse) => {
  return response.data.result.competitions;
};

// competition(특정대회) select 함수 정의
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
  selectOption: string[],
  sortOption: string,
) => {
  return useQuery({
    queryKey: queries.competition.filtered(dateFilter, locationFilter, selectOption, sortOption)
      .queryKey,
    queryFn: () =>
      competitionApi.getFilteredCompetitions(dateFilter, locationFilter, selectOption, sortOption),
    select: competitionsSelectFn,
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
