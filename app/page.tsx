import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonLink from '@/components/common/button/buttonLink';
import NavigationLayout from '@/components/layout/navigationLayout';

export default function Home() {
  // lineheight 1 font-size 30px
  return (
    <NavigationLayout>
      <Header rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
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
    </NavigationLayout>
  );
}
