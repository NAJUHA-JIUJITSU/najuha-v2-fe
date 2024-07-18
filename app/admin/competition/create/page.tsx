'use client';
import CompetitionCreateForm from '@/components/admin/competition/competitionCreateForm';
import { useCreateCompetition } from '@/hooks/admin';
import { useRouter } from 'next/navigation';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import { Primitive } from '@nestia/fetcher';

export default function CreateCompetition() {
  const router = useRouter();
  const { mutate: createCompetition } = useCreateCompetition();

  const handleCreateCompetition = (competitionInfo: Primitive<ICompetitionCreateDto>) => {
    createCompetition(competitionInfo, {
      onSuccess: (res) => {
        console.log(res);
        alert('대회가 등록되었습니다.');
        router.push(`/admin/competition/${res.competition.id}`);
      },
      onError: () => {
        alert('대회 등록에 실패했습니다.');
      },
    });
  };

  return <CompetitionCreateForm onCreate={handleCreateCompetition} />;
}
