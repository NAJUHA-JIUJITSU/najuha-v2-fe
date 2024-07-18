import CompetitionParticiPantInfo from '@/components/competitionParticipantInfo';
import { useGetApplicationInfo } from '@/hooks/applications';

export default function CheckApplyInfoPage({ applicationId }: { applicationId: string }) {
  //대회 신청 정보 가져오기
  const { data, isLoading, isError } = useGetApplicationInfo(applicationId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때
  if (isError || !data) {
    return <div>Error loading application information.</div>;
  }

  const { playerInfo, selectedDivision, expectedPayment } = data;

  return (
    <>
      <CompetitionParticiPantInfo
        playerInfo={playerInfo}
        selectedDivision={selectedDivision}
        expectedPayment={expectedPayment}
      />
    </>
  );
}
