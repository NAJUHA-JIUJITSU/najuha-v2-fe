import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';

export const submitApplication = async ({ applyInfo, params }) => {
  const formattedPlayerInfo = {
    ...applyInfo.playerInfo,
    phoneNumber: applyInfo.playerInfo.phoneNumber.replace(/[^0-9]/g, ''),
    gender: applyInfo.playerInfo.gender === '여성' ? 'FEMALE' : 'MALE',
    birth: applyInfo.playerInfo.birth.replace(/[^0-9]/g, ''),
  };

  const formattedExtraInfo = {
    ...applyInfo.extraInfo,
    ssn: applyInfo.extraInfo.ssn.replace(/[^0-9]/g, '').replace(/(\d{6})(\d{7})/, '$1-$2'),
  };

  const response = await withAuth((connection) =>
    api.functional.user.applications.createApplication(connection, {
      applicationType: 'PROXY',
      competitionId: params.competitionId,
      participationDivisionIds: applyInfo.selectedDicisionId,
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
    }),
  );
  return response.result;
};

export const getApplicationInfo = async (applicationId: string) => {
  const response = await withAuth((connection) =>
    api.functional.user.applications.getApplication(connection, applicationId),
  );

  return response.result.application;
};

export const applicationsApi = {
  submitApplication,
  getApplicationInfo,
};
