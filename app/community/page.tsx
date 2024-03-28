'use client';
import Header from '@/components/common/header/Header';
import styles from './index.module.scss';
import { IconLinkAlarm, IconLinkSearch } from '@/components/common/icon/iconLink';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import { useState } from 'react';
import Divider from '@/components/divider';
import PostCard from '@/components/postCard';
import { useSortOption } from '@/hook/useSortOption';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconSort from '@/public/svgs/sort.svg';

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
// id: number;
// title: string;
// type: 'seminar' | 'competition' | 'free';
// date: Date;
// likeCnt: number;
// viewCnt: number;
// commentCnt: number;
// content: string;
// hot: boolean;
// image?: string;
const postList = [
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

const sortOptions = ['일자순', '조회순', '마감임박순'];

export default function CommunityPage() {
  const { sortOption, setSortOption, handleSortOption } = useSortOption(sortOptions, '일자순');
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
      <div>
        {postList.map((post) => (
          <PostCard key={post.id} info={post} />
        ))}
      </div>
    </div>
  );
}
