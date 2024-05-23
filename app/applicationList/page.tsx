import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ApplicationListContent from '@/components/applicationList/applicationListContent';
import NavigationLayout from '@/components/layout/navigationLayout';

export default function applicationList() {
  return (
    <NavigationLayout>
      <Header title={'신청내역'} rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
      <ApplicationListContent />
    </NavigationLayout>
  );
}
