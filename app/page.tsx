import styles from './main.module.scss';
import Header from '../components/common/header/Header';
import IconNavigateBefore from '../public/svgs/navigate_before.svg';
import { LinkIconSearch, LinkIconAlarm, LinkIconLogo } from '../components/common/linkIcon';

export default function Home() {
  return (
    <>
      <Header
        leftIcon={<IconNavigateBefore />}
        title={<LinkIconLogo />}
        subtitle={'서브 타이틀'}
        rightIcon2={<LinkIconAlarm />}
        rightIcon1={<LinkIconSearch />}
      />
    </>
  );
}
