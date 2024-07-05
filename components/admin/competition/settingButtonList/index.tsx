import ButtonLink from '@/components/common/button/buttonLink';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import styles from './index.module.scss';
import { useUpdateCompetitionStatus } from '@/hooks/admin';
import { ICompetition } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import { useQueryClient } from '@tanstack/react-query';
import { queries } from '@/queries/index';

interface SettingButtonListProps {
  competitionId: string;
  competition: ICompetition;
}

export default function SettingButtonList({ competitionId, competition }: SettingButtonListProps) {
  const { mutate } = useUpdateCompetitionStatus();
  const queryClient = useQueryClient();

  const patchCompetitionStatus = () => {
    mutate(
      {
        competitionId,
        data: {
          status: competition.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
        },
      },
      {
        onSuccess: () => {
          alert(`대회 ${competition.status === 'ACTIVE' ? '비활성화' : '활성화'}에 성공했습니다.`);
          // competitionInfo refetch
          queryClient.invalidateQueries({
            queryKey: queries.competition.id(competitionId).queryKey,
          });
          // queryClient.invalidateQueries({
          //   queryKey: ['hi', competitionId],
          // });
        },
        onError: (error) => {
          alert(`대회 ${competition.status === 'ACTIVE' ? '비활성' : '활성화'}에 실패했습니다.`);
          console.error('Error updating competition status:', error);
        },
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <ButtonOnClick
        text={`대회 ${competition.status === 'ACTIVE' ? '비활성화' : '활성화'}하기`}
        onClick={patchCompetitionStatus}
        type="filled"
        size="medium"
        color="blue"
      />
      {/* 대회 수정하기, 할인등록하기, 필수추가정보 등록하기, 포스터 등록하기, 부문추가하기 */}

      <ButtonLink
        text="대회 수정하기"
        href={`/admin/competition/${competitionId}/patch`}
        type="filled"
        size="medium"
        color="blue"
      />
      <ButtonLink
        text="할인 등록하기"
        href={`/admin/competition/${competitionId}/discount`}
        type="filled"
        size="medium"
        color="blue"
      />
      <ButtonLink
        text="필수 추가정보 등록하기"
        href={`/admin/competition/${competitionId}/additional`}
        type="filled"
        size="medium"
        color="blue"
      />
      <ButtonLink
        text="포스터 등록하기"
        href={`/admin/competition/${competitionId}/poster`}
        type="filled"
        size="medium"
        color="blue"
      />
      <ButtonLink
        text="부문 추가하기"
        href={`/admin/competition/${competitionId}/division`}
        type="filled"
        size="medium"
        color="blue"
      />
      <ButtonLink
        text="부문 수정하기"
        href={`/admin/competition/${competitionId}/edit-division`}
        type="filled"
        size="medium"
        color="blue"
      />
    </div>
  );
}
