import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm, IconLinkLogo } from '@/components/common/icon/iconLink';
import NavigationLayout from '@/components/layout/navigationLayout';
import Link from 'next/link';

import { Divider } from '@/components/divider';
import {
  IconLinkThropy,
  IconLinkSeminar,
  IconLinkOpenmat,
  IconLinkEvent,
} from '@/components/common/icon/iconLink';

export default function Home() {
  return (
    <NavigationLayout>
      <Header
        leftIcon={<IconLinkLogo />}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      {/* 캐러셀 */}
      <div className={styles.carousel}>
        <img src="/images/sampleCarousel.png" alt="main-carousel" />
      </div>
      {/* 프로그램 버튼 */}
      <div className={styles.programBtnList}>
        <IconLinkThropy />
        <IconLinkSeminar />
        <IconLinkOpenmat />
        <IconLinkEvent />
      </div>
      <Divider />
    </NavigationLayout>
  );
}
