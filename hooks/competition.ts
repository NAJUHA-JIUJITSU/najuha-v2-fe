import { useQuery, useMutation } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { competitionApi } from '@/api/competitionApi';

//Todo: 무한스크롤 구현
export const useGetCompetitions = () => {
  return useQuery({
    queryKey: queries.competition.all().queryKey,
    queryFn: () => competitionApi.getCompetitions(),
  });
};

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
  });
};
