'use client';
import styles from './index.module.scss';
import { useParams, useRouter } from 'next/navigation';
import CompetitionAdditionalInfoForm from '@/components/admin/competition/competitionCreateForm/competitionAdditionalInfoForm';
import { useCreateRequiredAdditionalInfo } from '@/hooks/admin';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/components/common/header/Header';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';

export default function CreateAdditionalInfo() {
  const { competitionId } = useParams();
  const router = useRouter();
  const { mutate } = useCreateRequiredAdditionalInfo();
  const queryClient = useQueryClient();

  if (typeof competitionId !== 'string') return null;

  const handleCreate = (type: string, des: string) => {
    if (!competitionId) return;
    if (type !== 'ADDRESS' && type !== 'SOCIAL_SECURITY_NUMBER') return;
    mutate(
      {
        competitionId: competitionId as string,
        data: {
          type: type,
          description: des,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          alert('추가정보가 등록되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['competition', competitionId],
          });
        },
      },
    );
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
        title="추가정보 추가"
      />
      <CompetitionAdditionalInfoForm
        onCreate={handleCreate}
        onNext={() => {
          router.push(`/admin/competition/${competitionId}`);
        }}
      />
    </div>
  );
}
