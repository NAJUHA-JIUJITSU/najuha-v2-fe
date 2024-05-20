import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import NavigationBar from '@/components/common/navigationBar';
import ApplicationListContent from '@/components/applicationList/applicationListContent';

export default function applicationList() {
  return (
    <div className={styles.wrapper}>
      <Header title={'신청내역'} rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
      <ApplicationListContent />
      <NavigationBar />
    </div>
  );
}
