import { competition } from './../queries/competition';
import { axiosPublic } from '@/api/axios/axiosInstances.ts';

// 대회 목록 조회
export const getCompetitions = async () => {
  const response = await axiosPublic.get('/competition');
  return response;
};

// 대회 목록 조회 - 필터링
export const getFilteredCompetitions = async (
  dateFilter: string,
  locationFilter: string,
  selectOption: string[],
  sortOption: string,
) => {
  const response = await axiosPublic.get('/competition', {
    params: {
      dateFilter: dateFilter,
      locationFilter: locationFilter,
      selectOption: selectOption,
      sortOption: sortOption,
    },
  });
  return response;
};

export const competitionApi = {
  getCompetitions,
  getFilteredCompetitions,
};
