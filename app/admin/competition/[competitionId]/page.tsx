'use client';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import { useGetCompetitionId } from '@/hooks/competition';
import BaseLayout from '@/components/layout/baseLayout';

export default function AdminCompetitionId({ params }: { params: { competitionId: string } }) {
  // 대회 조회
  const {
    data: competition,
    isLoading,
    isError,
  } = useGetCompetitionId({
    competitionId: params.competitionId,
    admin: true,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <BaseLayout>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={competition?.title || '대회 상세페이지'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      {/* <ApplicatnionSatus /> */}
      {/* <SettingButtonList /> */}
      {/* <EventInformation /> */}
    </BaseLayout>
  );
}
