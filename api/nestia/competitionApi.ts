import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';

// 대회 목록 조회
export const getCompetitions = async () => {
  const response = await withAuth((connection) =>
    api.functional.user.competitions.findCompetitions(connection, { page: 0 }),
  );

  return response.result.competitions;
};

// 대회 목록 조회 - 필터링
export const getFilteredCompetitions = async (
  page: number,
  limit: number,
  dateFilter: string,
  locationFilter: string,
  selectFilter: string[],
  sortOption: string,
) => {
  const params: Record<string, any> = {
    page: page,
    limit: limit,
    sortOption: sortOption,
  };

  if (dateFilter !== '전체') {
    params.dateFilter = dateFilter;
  }

  if (locationFilter !== '전체') {
    params.locationFilter = locationFilter;
  }

  if (selectFilter.length > 0) {
    params.selectFilter = selectFilter;
  }
  console.log('대회 요청: ', { params });

  const response = await withAuth((connection) =>
    api.functional.user.competitions.findCompetitions(connection, params),
  );

  return response.result;
};

// 특정 대회 조회
export const getCompetitionId = async (competitionId: string) => {
  const response = await withAuth((connection) =>
    api.functional.user.competitions.getCompetition(connection, competitionId),
  );

  return response.result.competition;
};

export const competitionApi = {
  getCompetitions,
  getFilteredCompetitions,
  getCompetitionId,
};
