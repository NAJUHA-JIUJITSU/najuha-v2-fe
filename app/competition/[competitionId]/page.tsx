import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import CompetitionIdContent from '@/components/competitionId/competitionIdContent';
import BaseLayout from '@/layout/baseLayout';
import api from 'najuha-v2-api/lib/api';
import { Metadata } from 'next';
import { createConnectionWithoutToken } from '@/api/nestia/common';

export async function generateMetadata({
  params,
}: {
  params: { competitionId: string };
}): Promise<Metadata> {
  const res = await api.functional.user.competitions.getCompetition(
    {
      host: 'http://localhost:3001',
    },
    params.competitionId,
  );

  const competition = res.result.competition;

  const metadataBase = new URL('http://localhost:3000'); // production 환경에서는 실제 도메인으로 변경

  // 이미지 URL 구성
  const imageBaseURL = 'http://localhost:9000/najuha-v2-bucket';
  const latestPosterImage =
    competition.competitionPosterImages[competition.competitionPosterImages.length - 1];
  const imageUrl = latestPosterImage
    ? `${imageBaseURL}/${latestPosterImage.image.path}/${latestPosterImage.image.id}`
    : '';

  return {
    title: competition.title,
    description: competition.description,
    metadataBase,
    openGraph: {
      title: competition.title,
      description: competition.description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: competition.title,
        },
      ],
      type: 'article',
    },
  };
}

export default async function CompetitionId({ params }: { params: { competitionId: string } }) {
  const res = await api.functional.user.competitions.getCompetition(
    createConnectionWithoutToken(),
    params.competitionId,
  );

  const competition = res.result.competition;

  return (
    <BaseLayout>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={competition?.title || '대회 상세페이지'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <CompetitionIdContent competition={competition}></CompetitionIdContent>
    </BaseLayout>
  );
}
