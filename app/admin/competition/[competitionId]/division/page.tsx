'use client';
import CompetitionDivisionForm from '@/components/admin/competition/competitionCreateForm/competitionDivisionForm';
import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';
import { useState } from 'react';
import { useCreateDivision } from '@/hooks/admin';
import { useRouter, useParams } from 'next/navigation';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateDivision() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { competitionId } = useParams();
  const [divisionPackInfo, setDivisionPackInfo] = useState<IDivisionPack[]>([]);
  const { mutate } = useCreateDivision();

  // handle string[] type comeptitionId
  if (typeof competitionId !== 'string') return null;

  const handleCreateDivision = (competitionId: string, divisionPackInfo: IDivisionPack[]) => {
    if (competitionId === null) return;
    mutate(
      {
        competitionId: competitionId,
        data: {
          divisionPacks: divisionPackInfo,
        },
      },
      {
        onSuccess: () => {
          alert('부문이 등록되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['competition', competitionId],
          });
          router.push(`/admin/competition/${competitionId}/division`);
        },
        onError: () => {
          alert('부문 등록에 실패했습니다.');
        },
      },
    );
  };

  const handleOnNext = () => {
    router.push(`/admin/competition/${competitionId}/division`);
  };

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={
          <ButtonIcon
            icon={<IconNavigateBefore />}
            onClick={() => {
              router.push(`/admin/competition/${competitionId}`);
            }}
          />
        }
        title="부문추가"
      />
      <CompetitionDivisionForm
        divisionPackInfo={divisionPackInfo}
        setDivisionPackInfo={setDivisionPackInfo}
        competitionId={competitionId}
        createDivision={handleCreateDivision}
        onNext={handleOnNext}
      />
    </div>
  );
}
