'use client';
import React, { Fragment, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import Card from '@/components/card';
import { useGetFilteredCompetitions } from '@/hooks/competition';
import { CompetitionListProps } from '@/interfaces/competitionList';

export default function CompetitionList({
  dateFilter,
  locationFilter,
  selectFilter,
  sortOption,
  admin = false,
}: CompetitionListProps) {
  const {
    data: competitionList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFilteredCompetitions({ dateFilter, locationFilter, selectFilter, sortOption, admin });

  console.log('대회 리스트: ', competitionList);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

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

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>대회정보가 없습니다.</div>;

  return (
    <div className={styles.wrapper}>
      <h1>{dateFilter}</h1>
      <h1>{locationFilter}</h1>
      <h1>{selectFilter}</h1>
      <h1>{sortOption}</h1>

      {/* 대회 리스트 */}
      {competitionList?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.competitions.map((competition) => (
            <Card key={competition.id} type="normal" competition={competition} admin={admin} />
          ))}
        </Fragment>
      ))}
      {/* 무한 스크롤 로딩 및 상태 메시지 */}
      <div
        ref={lastElementRef}
        style={{ textAlign: 'center', padding: '100px', backgroundColor: 'red' }}
      >
        {isFetchingNextPage ? (
          <p>더 불러오는 중...</p>
        ) : !hasNextPage ? (
          <p>모든 대회를 다 불러왔습니다.</p>
        ) : null}
      </div>
    </div>
  );
}
