'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import TabList from '@/components/tapList';

// TabKey 타입 정의
type TabKey = 'writtenPosts' | 'commentedPosts' | 'likedPosts';

// Tabs 배열 상수 정의
const Tabs: TabKey[] = ['writtenPosts', 'commentedPosts', 'likedPosts'];

// TabLabel 상수 정의
const TabLabels: Record<TabKey, string> = {
  writtenPosts: '내 게시글',
  commentedPosts: '댓글단 글',
  likedPosts: '좋아요한 글',
};

export default function MyCommunityPage() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('writtenPosts');

  return (
    <div className={styles.wrapper}>
      <TabList<TabKey>
        tabs={Tabs}
        tabLabels={TabLabels}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />
      <div>
        <div
          style={{
            lineHeight: 4,
            fontSize: 18,
          }}
        >
          {TabLabels[selectedTab]} 리스트 불러오기
        </div>
      </div>
    </div>
  );
}
