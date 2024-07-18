'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import CompetitionIdContent from '@/components/competitionId/competitionIdContent';
import { useGetCompetitionId } from '@/hooks/competition';
import BaseLayout from '@/layout/baseLayout';

export default function CompetitionId({ params }: { params: { competitionId: string } }) {
  // 대회 조회
  const {
    data: competition,
    isLoading,
    isError,
  } = useGetCompetitionId({ competitionId: params.competitionId });

  return (
    <BaseLayout>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={competition?.title || '대회 상세페이지'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      {isLoading ? (
        <h3 className={styles.tmp}>Loading...</h3>
      ) : isError || !competition ? (
        <h3 className={styles.tmp}>대회정보가 없습니다.</h3>
      ) : (
        <CompetitionIdContent competition={competition}></CompetitionIdContent>
      )}
    </BaseLayout>
  );
}
