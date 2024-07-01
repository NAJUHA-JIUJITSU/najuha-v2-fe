'use client';
import React, { Fragment, useRef, useEffect } from 'react';
import PostCard from '@/components/postCard';
import Link from 'next/link';
import { useFindPosts } from '@/hooks/post';
import { IFindPostsQueryOptions } from 'najuha-v2-api/lib/modules/posts/domain/interface/post.interface';

type Category = 'ALL' | 'POPULAR' | 'FREE' | 'COMPETITION' | 'SEMINAR' | 'OPEN_MAT';

interface postCardListProps {
  categoryFilter: Category;
  sortOption: IFindPostsQueryOptions['sortOption'];
}

export default function PostCardList({ categoryFilter, sortOption }: postCardListProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    // 다음 페이지 요청 중이거나 다음 페이지가 없으면 return
    if (isFetchingNextPage || !hasNextPage) return;

    // IntersectionObserver 생성
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      // 마지막 리스트 요소가 화면에 보이면 다음 페이지 요청
      if (entries[0].isIntersecting) {
        console.log('다음 페이지 요청');
        fetchNextPage();
      }
    });

    // observer에 관찰 대상 등록
    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
            <Link href={`/post/${post.id}`} key={post.id}>
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
