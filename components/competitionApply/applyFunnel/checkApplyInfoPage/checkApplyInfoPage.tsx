import ApplyInfo from '@/components/applyInfo/applyInfo/applyInfo';
// import { useGetApplicationInfo } from '@/hooks/applications';
import { useGetApplicationInfo } from '@/api/nestia/hooks/applications';

export default function CheckApplyInfoPage({ applicationId }: { applicationId: string | null }) {
  //대회 신청 정보 가져오기
  const { data, isLoading, isError } = useGetApplicationInfo(applicationId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때
  if (isError) {
    return <div>Error loading application information.</div>;
  }

  const { playerInfo, selectedDivision } = data;

  return (
    <>
      <ApplyInfo playerInfo={playerInfo} selectedDivision={selectedDivision} />
    </>
  );
}
