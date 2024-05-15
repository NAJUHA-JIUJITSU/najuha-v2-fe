'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import TabList from '@/components/tapList';
import Link from 'next/link';
import PostCard from '@/components/postCard';

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

interface PostInfo {
  id: number;
  title: string;
  type: 'seminar' | 'competition' | 'free';
  date: Date;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  content: string;
  hot: boolean;
  image?: string;
}

const postList: PostInfo[] = [
  {
    id: 1,
    title: '제목2',
    type: 'free',
    // 2024년 1월 1일
    date: new Date(2024, 2, 26),
    likeCnt: 2312,
    viewCnt: 1123,
    commentCnt: 123,
    content:
      '게시물 내용은 여기다 좀ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 한줄보기로 할거야야얔ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    hot: true,
  },
  {
    id: 2,
    title: '제목1',
    type: 'competition',
    date: new Date(2024, 2, 27, 12, 30, 0), // 월인덱스는 0부터 시작
    likeCnt: 1231,
    viewCnt: 12322,
    commentCnt: 123,
    image: '/images/samplePoster1.png',
    content: '너네 이거 봄?',
    hot: false,
  },
  {
    id: 3,
    title:
      '제목3아ㅣㅁㄴ어ㅣ나멍ㅁ나어ㅣㅁ나어ㅣㅁㄴ어ㅣㅁ나어ㅣㅁㄴ어ㅣㅁ나어ㅣㅁ나어ㅣㅁ너ㅣㅁ나어ㅣㅁㄴ어',
    type: 'competition',
    date: new Date(2024, 2, 27, 18, 0, 0),
    likeCnt: 1231,
    viewCnt: 12322,
    commentCnt: 123,
    image: '/images/samplePoster1.png',
    content:
      '너네 이거 봄?ㅁㄴ이;ㅁ나이;ㅁ나이;ㄴ망;ㅣㅏㄴ아ㅗㅓㅂ저ㅏ옵자ㅓ옵자어ㅗㅂㅈ어ㅗㅂ자옵자어ㅗㅂ저ㅏ옵저ㅏ옺바옵저ㅏ오ㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁ',
    hot: false,
  },
];

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

        {postList.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostCard key={post.id} info={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
