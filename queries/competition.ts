import { createQueryKeys } from '@lukemorales/query-key-factory';

export const competition = createQueryKeys('competition', {
  all: () => ({
    queryKey: ['all'],
  }),
  filtered: (
    dateFilter: string | undefined,
    locationFilter: string | undefined,
    selectOption: string[],
    sortOption: string,
  ) => ({
    queryKey: [dateFilter, locationFilter, selectOption.join(','), sortOption],
  }),
  id: (competitionId: string) => ({
    queryKey: [competitionId],
  }),
});
