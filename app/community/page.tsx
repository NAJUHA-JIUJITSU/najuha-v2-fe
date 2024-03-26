'use client';
import Header from '@/components/common/header/Header';
import styles from './index.module.scss';
import { IconLinkAlarm, IconLinkSearch } from '@/components/common/icon/iconLink';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import { useState } from 'react';
import Divider from '@/components/divider';
import PostCard from '@/components/postCard';

const selectOptions = [
  {
    id: 'all',
    msg: '전체',
  },
  {
    id: 'popular',
    msg: '🔥인기',
  },
  {
    id: 'free',
    msg: '자유',
  },
  {
    id: 'competition',
    msg: '대회',
  },
  {
    id: 'seminar&openmat',
    msg: '세미나&오픈매트',
  },
  {
    id: 'recruit',
    msg: '모집',
  },
];

const postList = [
  {
    id: 1,
    title: '제목2',
    type: 'free',
    date: '2024-04-01',
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
    date: '2024-04-01',
    likeCnt: 1231,
    viewCnt: 12322,
    commentCnt: 123,
    image: '/images/samplePoster1.png',
    content: '너네 이거 봄?',
    hot: false,
  },
];

export default function CommunityPage() {
  const [selectedOption, setSelectedOption] = useState('all');

  function handleSelectOption(id: string) {
    setSelectedOption(id);
    console.log(`${id} 나 이걸로 정렬 할끄야`);
  }
  return (
    <div className={styles.wrapper}>
      <Header title="커뮤니티" rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
      <div className={styles.selectWrapper}>
        {selectOptions.map((option) => (
          <ButtonOnToggle
            key={option.id}
            type="outlined"
            color="black"
            size="medium"
            shape="tag"
            text={option.msg}
            isToggled={selectedOption === option.id}
            onToggle={() => handleSelectOption(option.id)}
          />
        ))}
      </div>
      <Divider />
      <div>
        {postList.map((post) => (
          <PostCard key={post.id} info={post} />
        ))}
      </div>
    </div>
  );
}
