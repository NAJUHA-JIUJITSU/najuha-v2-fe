import CompetitionPage from '../../components/competition/competitionPage/index';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import NavigationLayout from '@/layout/navigationLayout';

export default function Competition() {
  return (
    <NavigationLayout>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'대회일정'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <CompetitionPage />
    </NavigationLayout>
  );
}
