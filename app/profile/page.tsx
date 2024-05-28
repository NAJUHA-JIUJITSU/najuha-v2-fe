import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonLists from '@/components/common/buttonList/buttonLists';
import ProfileInfo from '@/components/profile/profileInfo';
import Ad from '@/components/ad';
import NavigationLayout from '@/components/layout/navigationLayout';

export default function profile() {
  const profileButtonLists = [
    { text: '게시판 활동', href: '/profile/myCommunity' },
    { text: '주최목록', href: '/profile/organizerProgramList' },
    { text: '신청내역', href: '/applicationList' },
    { text: '환경설정', href: '/' },
    { text: '고객센터', href: '/' },
    { text: '공지사항', href: '/' },
    { text: '약관 및 정책', href: '/' },
    { text: '로그아웃', href: '/' },
    { text: '현재 버전 2.0', href: '/' },
  ];

  return (
    <NavigationLayout>
      <Header title={'내 프로필'} rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
      <div className={styles.topSection}>
        <ProfileInfo />
      </div>
      {/* <Ad src={'/images/sampleAd.png'} alt={'ad'} size={'small'} /> */}
      <div className={styles.bottomSection}>
        <ButtonLists buttonLists={profileButtonLists} />
      </div>
    </NavigationLayout>
  );
}
