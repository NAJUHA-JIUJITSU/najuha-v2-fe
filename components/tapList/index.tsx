import React from 'react';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import styles from './index.module.scss';

type TabKey = string;

interface TabListProps<T extends TabKey> {
  tabs: T[];
  tabLabels: Record<T, string>;
  selectedTab: T;
  onSelectTab: (tab: T) => void;
}

export default function TabList<T extends TabKey>({
  tabs,
  tabLabels,
  selectedTab,
  onSelectTab,
}: TabListProps<T>) {
  return (
    <div className={styles.stickyWrapper}>
      <div className={styles.wrapper}>
        {tabs.map((tab) => (
          <ButtonOnToggle
            key={tab}
            type="tap"
            width="full"
            text={tabLabels[tab]}
            isToggled={selectedTab === tab}
            onToggle={() => onSelectTab(tab)}
          />
        ))}
      </div>
    </div>
  );
}
