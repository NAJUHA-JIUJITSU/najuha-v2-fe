'use client';
import styles from './main.module.scss';
import Header from '../components/common/header/Header';
import IconNavigateBefore from '../public/svgs/navigate_before.svg';
import { LinkIconSearch, LinkIconAlarm, LinkIconLogo } from '../components/common/linkIcon';
import { ButtonIconNavigateBefore } from '../components/common/button/buttonIcon';

export default function Home() {
  return (
    <>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'타이틀'}
        rightIcon1={<LinkIconAlarm />}
        rightIcon2={<LinkIconSearch />}
      />
    </>
  );
}
