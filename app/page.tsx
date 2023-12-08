import styles from './main.module.scss';
import iconAlarm from '../public/svgs/alarm.svg';
import Header from '@/components/common/header/Header';
import IconLogo from '../public/svgs/logo.svg';
import IconNavigateBefore from '../public/svgs/navigate_before.svg';
import IconSearch from '../public/svgs/search.svg';
import IconAlarm from '../public/svgs/alarm.svg';

export default function Home() {
  return (
    <>
      <Header
        leftIcon={<IconNavigateBefore />}
        title={<IconLogo />}
        subtitle={'페이지명'}
        rightIcon2={<IconAlarm />}
        rightIcon1={<IconSearch />}
      />
    </>
  );
}
