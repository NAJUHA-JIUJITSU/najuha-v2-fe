'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import CompetitionDescriptionContent from '../competitionDescriptionContent';
import TabList from '@/components/common/tapList';

type TabKey = 'DetailedInfo' | 'DivisionTable' | 'Timetable';

const Tabs: TabKey[] = ['DetailedInfo', 'DivisionTable', 'Timetable'];

const TabLabels = {
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
  const [selectedTab, setSelectedTab] = useState<TabKey>('DetailedInfo');

  return (
    <div className={styles.wrapper}>
      <TabList<TabKey>
        tabs={Tabs}
        tabLabels={TabLabels}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />

      <CompetitionDescriptionContent description={props.description[selectedTab]} />
    </div>
  );
}
