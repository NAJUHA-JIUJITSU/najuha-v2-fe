import { createQueryKeys } from '@lukemorales/query-key-factory';

export const competition = createQueryKeys('competition', {
  all: () => ({
    queryKey: ['all'],
  }),
  filtered: (
    dateFilter: string,
    locationFilter: string,
    selectOption: string[],
    sortOption: string,
  ) => ({
    queryKey: [dateFilter, locationFilter, selectOption.join(','), sortOption],
  }),
  id: (competitionId: number) => ({
    queryKey: [competitionId],
  }),
});
