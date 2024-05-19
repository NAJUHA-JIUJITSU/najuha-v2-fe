'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import Header from '@/components/common/header/Header';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import TabList from '@/components/tapList';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import ApplicantProgramCard from '@/components/programCard/applicantProgramCard';

// TabKey 타입 정의
type TabKey = 'competiton' | 'seminar' | 'openmat';

// Tabs 배열 상수 정의
const Tabs: TabKey[] = ['competiton', 'seminar', 'openmat'];

// TabLabel 상수 정의
const TabLabels: Record<TabKey, string> = {
  competiton: '대회',
  seminar: '세미나',
  openmat: '오픈매트',
};

// tagBtnOptions 배열 상수 정의
const tagBtnOptions = ['전체', '결제완료', '미결제', '환불'];

export default function applicationList() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('competiton');
  const [selectOptionsState, setSelectOptionsState] = useState<string>('전체');

  return (
    <div className={styles.wrapper}>
      <Header title={'신청내역'} rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
      <TabList<TabKey>
        tabs={Tabs}
        tabLabels={TabLabels}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />
      <div className={styles.tagBtnOptionsWrapper}>
        {tagBtnOptions.map((option) => (
          <ButtonOnToggle
            key={option}
            type="tag"
            text={option}
            isToggled={selectOptionsState === option}
            onToggle={() => setSelectOptionsState(option)}
          />
        ))}
      </div>
      <div className={styles.applicationCardList}>
        <p>
          {TabLabels[selectedTab]}의 {selectOptionsState} 상태의 리스트 불러오기
        </p>
        <ApplicantProgramCard />
        <ApplicantProgramCard />
      </div>
    </div>
  );
}
