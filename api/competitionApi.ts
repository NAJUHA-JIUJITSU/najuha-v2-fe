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

  const response = await axiosPublic.get('user/competitions', { params: params });

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
