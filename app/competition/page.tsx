import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import Card from '@/components/card';
import CompetitionList from '@/components/competitionList';

export default function Competition() {
  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'대회일정'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <div className={styles.filterWrapper}>
        <h1>날짜 지역 검색</h1>
      </div>
      <div className={styles.sortWrapper}>
        <h1>정렬</h1>
      </div>
      <div className={styles.CompetitionListWrapper}>
        <CompetitionList sortOption="조회순" dateFilter="2024-04" />
      </div>
    </div>
  );
}
