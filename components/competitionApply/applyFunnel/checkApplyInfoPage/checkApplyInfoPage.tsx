import { useQuery } from '@tanstack/react-query';
import { applicationsApi } from '@/api/applicationsApi';
import ApplyInfo from '@/components/applyInfo/applyInfo/applyInfo';

export default function CheckApplyInfoPage({ applicationId }: { applicationId: string | null }) {
  // 네트워크 요청을 수행하는 useQuery 훅
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['applicationInfo', applicationId],
    queryFn: () => applicationsApi.getApplicationInfo(applicationId as string),
    enabled: !!applicationId, // applicationId가 존재할 때만 요청 수행
  });

  // 요청 중일 때와 에러 발생 시의 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading application info</div>;
  }
  // 데이터 파싱
  let parsedData = data?.result.application;

  // 정제되지않은 데이터를 정제하는 부분
  const selectedDivisionTest = parsedData?.participationDivisionInfos.map((x) => {
    return x.participationDivisionInfoSnapshots[x.participationDivisionInfoSnapshots.length - 1]
      .division;
  });

  // 프롭스로 넘겨줄 애들
  const playerInfo = parsedData?.playerSnapshots[parsedData.playerSnapshots.length - 1];
  const selectedDivision = selectedDivisionTest.map((x) => {
    return { belt: x.belt, category: x.category, uniform: x.uniform, weight: x.weight };
  });
  // i want to remove first 2letters
  playerInfo.birth = playerInfo.birth.slice(2);

  return (
    <>
      <ApplyInfo playerInfo={playerInfo} selectedDivision={selectedDivision} />
    </>
  );
}
