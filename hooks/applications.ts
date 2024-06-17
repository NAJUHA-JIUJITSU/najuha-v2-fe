import { useMutation, useQuery } from '@tanstack/react-query';
import { applicationsApi } from '@/api/nestia/applicationsApi';
import { IApplication } from '@/node_modules/najuha-v2-api/lib/modules/applications/domain/interface/application.interface';

//대회 신청하기
export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: applicationsApi.submitApplication,
    onSuccess: (data) => {
      console.log('Application submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
    },
  });
};

//대회 신청 정보 가져오기
export const useGetApplicationInfo = (applicationId: string) => {
  return useQuery({
    queryKey: ['applicationInfo', applicationId],
    queryFn: () => applicationsApi.getApplicationInfo(applicationId),
    enabled: !!applicationId,
    select: (data: IApplication) => parseApplicationData(data),
  });
};

export const parseApplicationData = (data: IApplication) => {
  const parsedData = data;

  // 정제되지 않은 데이터를 정제하는 부분
  const selectedDivisionTest = parsedData?.participationDivisionInfos.map((x) => {
    return x.participationDivisionInfoSnapshots[x.participationDivisionInfoSnapshots.length - 1]
      .division;
  });

  // 프롭스로 넘겨줄 데이터 구성
  const playerInfo = parsedData?.playerSnapshots[parsedData.playerSnapshots.length - 1];
  const selectedDivision = selectedDivisionTest.map((x) => {
    return { belt: x.belt, category: x.category, uniform: x.uniform, weight: x.weight };
  });
  const expectedPayment = parsedData.expectedPayment;

  // 생년월일에서 앞 두 글자 제거
  playerInfo.birth = playerInfo.birth.slice(2);

  return { playerInfo, selectedDivision, expectedPayment };
};
