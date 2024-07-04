import { withAuth } from '@/api/nestia/common';
import { CompetitionListProps } from '@/interfaces/competitionList';
import api from 'najuha-v2-api/lib/api';
import {
  TCompetitionLocationFilter,
  TCompetitionSelectFilter,
  TCompetitionSortOption,
} from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

// 대회 목록 조회
export const getCompetitions = async () => {
  const response = await withAuth((connection) =>
    api.functional.user.competitions.findCompetitions(connection, { page: 0 }),
  );

  return response.result.competitions;
};

export interface fetchCompetitionsParams {
  page: number;
  limit: number;
  dateFilter?: string;
  locationFilter?: TCompetitionLocationFilter;
  selectFilter?: TCompetitionSelectFilter[];
  sortOption: TCompetitionSortOption;
}

export interface getFilteredCompetitionsParams extends CompetitionListProps {
  page: number;
  limit: number;
}
// 대회 목록 조회 - 필터링
export const getFilteredCompetitions = async (params: fetchCompetitionsParams) => {
  console.log('대회 요청: ', { params });
  // admin이 true면 admin api로, 아니면 user api로 요청

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
