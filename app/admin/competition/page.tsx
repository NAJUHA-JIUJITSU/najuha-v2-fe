import ButtonLink from '@/components/common/button/buttonLink';

export default function AdminCompetition() {
  return (
    <div>
      <ButtonLink
        href="/admin/competition/create"
        text="대회 생성"
        size="xLarge"
        type="filled"
        color="blue"
        width="full"
      />
    </div>
  );
}
