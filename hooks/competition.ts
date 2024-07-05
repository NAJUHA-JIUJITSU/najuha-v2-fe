import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { competitionApi, fetchCompetitionsParams } from '@/api/nestia/competitionApi';
import { CompetitionListProps } from '@/interfaces/competitionList';
import { adminCompetitionsApi } from '@/api/nestia/admin/competitionsApi';
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
  admin = false,
}: CompetitionListProps) => {
  const fetchCompetitions = async ({ pageParam }: { pageParam: number }) => {
    const params: fetchCompetitionsParams = {
      page: pageParam,
      limit: 10, // limit
      dateFilter: dateFilter !== '전체' ? dateFilter : undefined,
      locationFilter: locationFilter !== '전체' ? locationFilter : undefined,
      selectFilter: selectFilter.length > 0 ? selectFilter : undefined,
      sortOption,
    };

    const api = admin
      ? adminCompetitionsApi.findCompetitionApi(params)
      : competitionApi.getFilteredCompetitions(params);
    const response = await api;
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
export const useGetCompetitionId = ({
  competitionId,
  admin = false,
}: {
  competitionId: string;
  admin?: boolean;
}) => {
  const getCompetition = admin
    ? adminCompetitionsApi.getCompetitionApi(competitionId)
    : competitionApi.getCompetitionId(competitionId);

  return useQuery({
    // queryKey: ['hi', competitionId],
    // queryKey: ['competition', competitionId],
    queryKey: queries.competition.id(competitionId).queryKey,
    queryFn: () => getCompetition,
  });
};
