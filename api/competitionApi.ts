import { axiosPublic } from '@/api/axios/axiosInstances.ts';

// 대회 목록 조회
export const getCompetitions = async () => {
  const response = await axiosPublic.get('user/competitions');
  return response;
};

// 대회 목록 조회 - 필터링
export const getFilteredCompetitions = async (
  page: number,
  limit: number,
  dateFilter: string | undefined,
  locationFilter: string | undefined,
  selectFilter: string[],
  sortOption: string,
) => {
  console.log('대회 요청: ', {
    page: page,
    limit: limit,
    dateFilter: dateFilter,
    locationFilter: locationFilter,
    selectFilter: selectFilter,
    sortOption: sortOption,
  });

  const response = await axiosPublic.get('user/competitions', {
    params: {
      page: page,
      limit: limit,
      dateFilter: dateFilter,
      locationFilter: locationFilter,
      selectFilter: selectFilter,
      sortOption: sortOption,
    },
  });

  console.log('대회 응답: ', response.data.result);
  return response;
};

// 특정 대회 조회
export const getCompetitionId = async (competitionId: number) => {
  const response = await axiosPublic.get(`user/competitions/${competitionId}`);
  console.log(response);
  return response;
};

export const competitionApi = {
  getCompetitions,
  getFilteredCompetitions,
  getCompetitionId,
};
