import { axiosPrivate, axiosPublic } from '@/api/axios/axiosInstances.ts';

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
  return response;
};

// 특정 대회 조회
export const getCompetitionId = async (competitionId: number) => {
  const response = await axiosPublic.get(`user/competitions/${competitionId}`);
  console.log(response);
  return response;
};

// 대회 신청
// export const submitApplication = async ({ applyInfo, params }) => {
//   const { competitionId, playerInfo, extraInfo, selectedDicisionId } = applyInfo;
//   console.log(params.competitionId);
//   playerInfo.phoneNumber = playerInfo.phoneNumber.replace(/[^0-9]/g, '');
//   // gender in playerinfo is to change  from 여성 to female and from 남성 to male
//   playerInfo.gender = playerInfo.gender === '여성' ? 'FEMALE' : 'MALE';
//   // birth in playerinfo is to change from 1998/04/04 to 19980404
//   playerInfo.birth = playerInfo.birth.replace(/[^0-9]/g, '');
//   // social security number in extraInfo is to change from 9804041231234 to 980404-1231234
//   extraInfo.ssn = extraInfo.ssn.replace(/[^0-9]/g, '').replace(/(\d{6})(\d{7})/, '$1-$2');

//   const response = await axiosPrivate.post('/user/applications', {
//     applicationType: 'PROXY',
//     competitionId: params.competitionId,
//     participationDivisionIds: selectedDicisionId,
//     playerSnapshotCreateDto: {
//       ...playerInfo,
//       network: applyInfo.teamInfo.network,
//       team: applyInfo.teamInfo.team,
//       masterName: applyInfo.teamInfo.masterName,
//     },
//     additionalInfoCreateDtos: [
//       { type: 'SOCIAL_SECURITY_NUMBER', value: extraInfo.ssn },
//       { type: 'ADDRESS', value: extraInfo.address },
//     ],
//   });
//   return response.data;
// };

export const submitApplication = async ({ applyInfo, params }) => {
  const { playerInfo, extraInfo, selectedDicisionId } = applyInfo;

  // 새로운 객체에 변환된 값 설정
  const formattedPlayerInfo = {
    ...playerInfo,
    phoneNumber: playerInfo.phoneNumber.replace(/[^0-9]/g, ''),
    gender: playerInfo.gender === '여성' ? 'FEMALE' : 'MALE',
    birth: playerInfo.birth.replace(/[^0-9]/g, ''),
  };

  const formattedExtraInfo = {
    ...extraInfo,
    ssn: extraInfo.ssn.replace(/[^0-9]/g, '').replace(/(\d{6})(\d{7})/, '$1-$2'),
  };

  console.log(params.competitionId);

  const response = await axiosPrivate.post('/user/applications', {
    applicationType: 'PROXY',
    competitionId: params.competitionId,
    participationDivisionIds: selectedDicisionId,
    playerSnapshotCreateDto: {
      ...formattedPlayerInfo,
      network: applyInfo.teamInfo.network,
      team: applyInfo.teamInfo.team,
      masterName: applyInfo.teamInfo.masterName,
    },
    additionalInfoCreateDtos: [
      { type: 'SOCIAL_SECURITY_NUMBER', value: formattedExtraInfo.ssn },
      { type: 'ADDRESS', value: formattedExtraInfo.address },
    ],
  });

  return response.data;
};

export const competitionApi = {
  getCompetitions,
  getFilteredCompetitions,
  getCompetitionId,
  submitApplication,
};
