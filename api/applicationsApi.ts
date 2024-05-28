import { axiosPrivate, axiosPublic } from '@/api/axios/axiosInstances.ts';

// u-6-1 create application post /user/applications
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

// u-6-2 get application get /user/applications/{applicationId}
export const getApplicationInfo = async (applicationId: string | null) => {
  const response = await axiosPrivate.get(`/user/applications/${applicationId}`);
  return response.data;
};

export const applicationsApi = {
  submitApplication,
  getApplicationInfo,
};
