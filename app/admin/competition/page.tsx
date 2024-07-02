import ButtonLink from '@/components/common/button/buttonLink';
import CompetitionPage from '@/components/competition/competitionPage/index';

export default function AdminCompetition() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
      <ButtonLink
        href="/admin/competition/create"
        text="대회 생성"
        size="xLarge"
        type="filled"
        color="blue"
        width="full"
      />
      <CompetitionPage admin />
    </div>
  );
}
