'use client';

import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import CompetitionIdContent from './client/index';
import { useGetCompetitionId } from '@/hooks/competition';

export default function CompetitionId({ params }: { params: { competitionId: number } }) {
  // 대회 조회
  const { data: competition, isLoading, isError } = useGetCompetitionId(params.competitionId);

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={competition?.title || '대회 상세페이지'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : isError || !competition ? (
        <div>대회정보가 없습니다.</div>
      ) : (
        <CompetitionIdContent competition={competition}></CompetitionIdContent>
      )}
    </div>
  );
}
