import NavigationBar from '@/components/common/navigationBar';
import ButtonLink from '@/components/common/button/buttonLink';

export default function Home() {
  // lineheight 1 font-size 30px
  return (
    <div>
      <div
        style={{
          lineHeight: 1,
          fontSize: 30,
        }}
      >
        서버컴포넌트입니다.
      </div>
      <ButtonLink
        type="filled"
        size="xLarge"
        color="blue"
        text="대회일정 보러가기"
        href="/competition"
      />
      <NavigationBar />
    </div>
  );
}
