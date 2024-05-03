'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import CompetitionDescriptionContent from '../CompetitionDescriptionContent';

type TabKey = 'DetailedInfo' | 'DivisionTable' | 'Timetable';

const TabLabel = {
  DetailedInfo: '상세정보',
  DivisionTable: '부문/상금표',
  Timetable: '타임 테이블',
};

interface Description {
  title: string;
  img?: string;
  content: string;
}

interface CompetitionDetailsProps {
  description: {
    DetailedInfo: Description[];
    DivisionTable?: Description[];
    Timetable?: Description[];
  };
}

export default function CompetitionDetails(props: CompetitionDetailsProps) {
  const tabs: TabKey[] = ['DetailedInfo', 'DivisionTable', 'Timetable'];
  const [selectedTab, setSelectedTab] = useState<TabKey>('DetailedInfo');

  return (
    <div className={styles.wrapper}>
      <div className={styles.tapWrapper}>
        {tabs.map((tab, index) => (
          <ButtonOnToggle
            key={index}
            type="tap"
            width="full"
            text={TabLabel[tab]}
            isToggled={selectedTab === tab}
            onToggle={() => setSelectedTab(tab)}
          />
        ))}
      </div>
      <CompetitionDescriptionContent description={props.description[selectedTab]} />
    </div>
  );
}
