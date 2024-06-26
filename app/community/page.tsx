'use client';
import Header from '@/components/common/header/Header';
import styles from './index.module.scss';
import { IconLinkAlarm, IconLinkSearch } from '@/components/common/icon/iconLink';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import { useState } from 'react';
import { Divider } from '@/components/divider';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconSort from '@/public/svgs/sort.svg';
import NavigationLayout from '@/components/layout/navigationLayout';
import { IFindPostsQueryOptions } from 'najuha-v2-api/lib/modules/posts/domain/interface/post.interface';
import PostCardList from '@/components/postCardList';
const sortOptions: IFindPostsQueryOptions['sortOption'][] = ['최신순', '조회순'];

type Category = 'ALL' | 'POPULAR' | 'FREE' | 'COMPETITION' | 'SEMINAR' | 'OPEN_MAT';
const categoryFilters: Category[] = [
  'ALL',
  'POPULAR',
  'FREE',
  'COMPETITION',
  'SEMINAR',
  'OPEN_MAT',
];
const categoryFiltersKr = {
  ALL: '전체',
  FREE: '자유',
  POPULAR: '🔥인기',
  COMPETITION: '대회',
  SEMINAR: '세미나',
  OPEN_MAT: '오픈매트',
};

export default function CommunityPage() {
  const [sortOption, setSortOption] = useState<IFindPostsQueryOptions['sortOption']>('최신순');
  const [categoryFilter, setCategoryFilter] = useState<Category>('ALL');

  const handleSortOption = () => {
    const currentIndex = sortOptions.indexOf(sortOption);
    const nextIndex = currentIndex >= sortOptions.length - 1 ? 0 : currentIndex + 1;
    setSortOption(sortOptions[nextIndex]);
  };

  const handleCategoryFilter = (category: Category) => {
    setCategoryFilter(category);
  };

  return (
    <NavigationLayout>
      <Header title="커뮤니티" rightIcon1={<IconLinkAlarm />} rightIcon2={<IconLinkSearch />} />
      <div className={styles.stickyWrapper}>
        <div className={styles.selectWrapper}>
          {categoryFilters.map((category) => (
            <ButtonOnToggle
              key={category}
              type="tag"
              text={categoryFiltersKr[category]}
              isToggled={categoryFilter === category}
              onToggle={() => handleCategoryFilter(category)}
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
      </div>
      <PostCardList categoryFilter={categoryFilter} sortOption={sortOption} />
    </NavigationLayout>
  );
}
