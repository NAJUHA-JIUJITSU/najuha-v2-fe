'use client';
import React from 'react';
import CompetitionForm from '@/components/admin/competition/competitionForm';
import { useGetCompetitionId } from '@/hooks/competition';
import { useUpdateCompetition } from '@/hooks/admin';
import { useRouter, useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Primitive } from 'najuha-v2-api/lib/api';
import { UpdateCompetitionReqBody } from 'najuha-v2-api/lib/modules/competitions/presentation/competitions.controller.dto';

const CompetitionPatch = () => {
  const router = useRouter();
  const { competitionId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: updateCompetition } = useUpdateCompetition();
  const { data: fetchedCompetition, isLoading } = useGetCompetitionId({
    competitionId: competitionId as string,
    admin: true,
    enabled: !!competitionId,
  });

  const handleUpdateCompetition = (
    competitionId: string,
    competitionInfo: Primitive<UpdateCompetitionReqBody>,
  ) => {
    updateCompetition(
      { competitionId, data: competitionInfo },
      {
        onSuccess: (res) => {
          console.log(res);
          alert('대회가 수정되었습니다.');

          queryClient.invalidateQueries({
            queryKey: ['competition', competitionId],
          });
          router.push(`/admin/competition/${competitionId}`);
        },
        onError: () => {
          alert('대회 수정에 실패했습니다.');
        },
      },
    );
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <CompetitionForm
      competitionId={competitionId as string}
      initialData={fetchedCompetition}
      onUpdate={handleUpdateCompetition}
    />
  );
};

export default CompetitionPatch;
