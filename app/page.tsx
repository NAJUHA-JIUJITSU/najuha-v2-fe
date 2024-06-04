import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm, IconLinkLogo } from '@/components/common/icon/iconLink';
import NavigationLayout from '@/components/layout/navigationLayout';
import Image from 'next/image';
import ProgramPreviewList from '@/components/programPreviewList';

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
        <Image src="/images/sampleCarousel.png" alt="main-carousel" width={500} height={500} />
      </div>
      {/* 프로그램 버튼 */}
      <div className={styles.programBtnList}>
        <IconLinkThropy />
        <IconLinkSeminar />
        <IconLinkOpenmat />
        <IconLinkEvent />
      </div>
      <Divider />
      {/* 프로그램 미리보기 */}
      <>
        <ProgramPreviewList
          title="요즘 핫한 대회"
          selectFilter={['신청가능']}
          sortOption="조회순"
        />
        <Divider />
        <ProgramPreviewList
          title="신청마감 임박 대회"
          selectFilter={['신청가능']}
          sortOption="마감임박순"
        />
        <Divider />
        <ProgramPreviewList
          title="얼리버드 기간인 대회"
          selectFilter={['신청가능', '얼리버드']}
          sortOption="일자순"
        />
      </>
      {/* 배너 광고 */}
      {/* 검색어 순위 */}
    </NavigationLayout>
  );
}
