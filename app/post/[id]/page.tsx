'use client';
import React, { useRef, useEffect } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import Comment from '@/components/comments//comment';
import { ThinDivider, Divider } from '@/components/divider';
import BaseLayout from '@/components/layout/baseLayout';
import { ButtonIconMoreVert } from '@/components/common/icon/iconOnClick';
import { useUserID } from '@/hooks/user';
import { useGetPost, useFindComments } from '@/hooks/post';
import { TId } from 'najuha-v2-api/lib/common/common-types';

export default function PostId({ params }: { params: { id: TId } }) {
  const { data: post } = useGetPost(params.id);
  const {
    data: comments,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFindComments(params.id);
  const { data: userInfo } = useUserID();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  console.log('comments', comments);

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

  if (!post) return null;
  if (!comments) return null;

  // 가장 좋아요가 많은 댓글 찾기
  const bestComment = comments.pages[0].comments.reduce((prev, current) => {
    return prev.likeCount > current.likeCount ? prev : current;
  }, comments.pages[0].comments[0] || null);
  const isBestComment = bestComment?.likeCount > 0;

  return (
    <BaseLayout>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title="글페이지"
        rightIcon1={
          <ButtonIconMoreVert id={params.id} isHost={post.post.user.id === userInfo?.id} />
        }
      />
      <Post postId={params.id} />
      <ThinDivider />
      {/* BEST 댓글이 존재하고 좋아요가 10개 이상일 때만 노출 */}
      {isBestComment && (
        <>
          <Comment
            postId={params.id}
            comment={bestComment}
            type="comment"
            writer={bestComment.userId === userInfo?.id}
            isBest={true}
            isPreview={true}
          />
          <Divider />
        </>
      )}
      {comments.pages.map((page) =>
        page.comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              postId={params.id}
              comment={comment}
              type="comment"
              writer={comment.userId === userInfo?.id}
              isBest={comment.id === bestComment.id && isBestComment}
            />
            <ThinDivider key={`divider-${comment.id}`} />
          </>
        )),
      )}
      <div
        ref={lastElementRef}
        style={{ textAlign: 'center', padding: '100px', backgroundColor: 'yellow' }}
      >
        {isFetchingNextPage ? '더 불러오는 중...' : hasNextPage ? '더 불러오는 중' : '끝!'}
        {isError && !isFetchingNextPage && '댓글을 불러오는 과정에서 에러가 발생했습니다.'}
      </div>
    </BaseLayout>
  );
}
