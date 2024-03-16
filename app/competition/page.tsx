'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import CompetitionList from '@/components/competitionList';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconSort from '@/public/svgs/sort.svg';
import Divider from '@/components/divider';
import { useSortOption } from '@/hook/useSortOption';

const sortOptions = ['일자순', '조회순', '마감임박순'];

export default function Competition() {
  const { sortOption, handleSortOption } = useSortOption(sortOptions);
  const [dateFilter, setDateFilter] = useState('2024-04');

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
      <Divider />
      <div className={styles.sortWrapper}>
        <ButtonOnClick
          type="text"
          size="small"
          color="gray"
          text={sortOption}
          iconLeft={<IconSort />}
          onClick={handleSortOption}
        />
      </div>
      <div className={styles.CompetitionListWrapper}>
        <CompetitionList sortOption={sortOption} dateFilter={dateFilter} />
      </div>
    </div>
  );
}
