'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import CompetitionMarkdown from '../CompetitionMarkdown';

type TabKey = 'DetailedInfo' | 'PrizeInfo' | 'Timetable';

interface CompetitionDetailsProps {
  description: {
    DetailedInfo: string;
    PrizeInfo: string;
    Timetable: string;
  };
}

export default function CompetitionDetails(props: CompetitionDetailsProps) {
  const tabs: TabKey[] = ['DetailedInfo', 'PrizeInfo', 'Timetable'];
  const [selectedTab, setSelectedTab] = useState<TabKey>('DetailedInfo');

  const tabLabel = {
    DetailedInfo: '상세정보',
    PrizeInfo: '부문/상금표',
    Timetable: '타임 테이블',
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tapWrapper}>
        {tabs.map((tab, index) => (
          <ButtonOnToggle
            key={index}
            type="tap"
            width="full"
            text={tabLabel[tab]}
            isToggled={selectedTab === tab}
            onToggle={() => setSelectedTab(tab)}
          />
        ))}
      </div>
      <CompetitionMarkdown description={props.description[selectedTab]} />
    </div>
  );
}
