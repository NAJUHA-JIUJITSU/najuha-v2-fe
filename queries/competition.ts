import { createQueryKeys } from '@lukemorales/query-key-factory';

export const competition = createQueryKeys('competition', {
  all: () => ({
    queryKey: ['competition', 'all'],
  }),
  filtered: (
    dateFilter: string,
    locationFilter: string,
    selectOption: string[],
    sortOption: string,
  ) => ({
    queryKey: ['competition', 'filtered', dateFilter, locationFilter, selectOption, sortOption],
  }),
});
