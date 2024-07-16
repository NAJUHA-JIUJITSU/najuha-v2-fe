'use client';
import React from 'react';
import { useFindComments } from '@/hooks/post';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import Comment from '@/components/comments//comment';
import { ThinDivider, Divider } from '@/components/divider';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ICommentSnapshot } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment-snapshot.interface';
import { useFindBestComments } from '@/hooks/post';

interface commentListProps {
  postId: TId;
  postUserId: TId;
  userId: TId | undefined;
  editingComment: {
    id: TId;
    body: ICommentSnapshot['body'];
    parentId?: TId;
  } | null;
  handleEditComment: (id: TId, body: ICommentSnapshot['body']) => void;
  handleReplyComment: (parentId: TId) => void;
  replyingCommentId: TId | null;
}

export default function CommentList({
  postId,
  postUserId,
  userId,
  editingComment,
  handleEditComment,
  handleReplyComment,
  replyingCommentId,
}: commentListProps) {
  const {
    data: comments,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFindComments(postId);
  const lastElementRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);
  const { data: bestComment } = useFindBestComments(postId);

  if (!comments) return null;
  if (!bestComment) return null;

  return (
    <>
      {bestComment && (
        <>
          <Comment
            postId={postId}
            postUserId={postUserId}
            comment={bestComment.comment}
            isWriter={postUserId === userId}
            isHost={bestComment.comment?.userId === userId}
            isBest={true}
            isPreview={true}
            handleEditComment={handleEditComment}
            handleReplyComment={handleReplyComment}
          />
          <Divider />
        </>
      )}
      {comments.pages.map((page) =>
        page.comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              postId={postId}
              postUserId={postUserId}
              isWriter={comment.userId === postUserId}
              comment={comment}
              isHost={comment.userId === userId}
              isBest={comment.id === bestComment.comment?.id}
              handleEditComment={handleEditComment}
              handleReplyComment={handleReplyComment}
              isReplying={replyingCommentId === comment.id}
              editingComment={editingComment}
            />
            <ThinDivider key={`divider-${comment.id}`} />
          </>
        )),
      )}
      {/* 무한스크롤 로딩 존 */}
      <div
        ref={lastElementRef}
        style={{ textAlign: 'center', padding: '100px', backgroundColor: 'yellow' }}
      >
        {isFetchingNextPage ? '더 불러오는 중...' : hasNextPage ? '더 불러오는 중' : '끝!'}
        {isError && !isFetchingNextPage && '댓글을 불러오는 과정에서 에러가 발생했습니다.'}
      </div>
    </>
  );
}
