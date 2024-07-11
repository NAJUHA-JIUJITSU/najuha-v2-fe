'use client';
import React, { Fragment } from 'react';
import PostCard from '@/components/postCard';
import Link from 'next/link';
import { useFindPosts } from '@/hooks/post';
import { IFindPostsQueryOptions } from 'najuha-v2-api/lib/modules/posts/domain/interface/post.interface';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

type Category = 'ALL' | 'POPULAR' | 'FREE' | 'COMPETITION' | 'SEMINAR' | 'OPEN_MAT';

interface postCardListProps {
  categoryFilter: Category;
  sortOption: IFindPostsQueryOptions['sortOption'];
}

export default function PostCardList({ categoryFilter, sortOption }: postCardListProps) {
  const categoryFiltersToSend = categoryFilter === 'ALL' ? undefined : [categoryFilter];

  const {
    data: postList,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFindPosts({
    categoryFilters: categoryFiltersToSend,
    sortOption: sortOption,
  });
  const lastElementRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (isFetchingNextPage)
    return (
      <div style={{ textAlign: 'center', padding: '100px', backgroundColor: 'red' }}>
        Loading...
      </div>
    );

  if (isError)
    return (
      <div style={{ textAlign: 'center', padding: '100px', backgroundColor: 'red' }}>
        게시물이 없습니다.
      </div>
    );

  return (
    <div>
      {postList?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.posts.map((post) => (
            <Link href={`community/posts/${post.id}`} key={post.id}>
              <PostCard key={post.id} post={post} />
            </Link>
          ))}
        </Fragment>
      ))}
      <div
        ref={lastElementRef}
        style={{ textAlign: 'center', padding: '100px', backgroundColor: 'red' }}
      >
        {isFetchingNextPage ? '더 불러오는 중...' : hasNextPage ? '더 불러오는 중' : '끝!'}
      </div>
    </div>
  );
}
