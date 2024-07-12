'use client';
import React, { useState } from 'react';
import styles from '../index.module.scss';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';
import { useCreateCommentLike, useDeleteCommentLike } from '@/hooks/post';
import { useQueryClient } from '@tanstack/react-query';

interface ReactionProps {
  postId: string;
  commentId: string;
  userLiked?: boolean;
  likeCnt?: number;
  replyCnt?: number;
  isReply?: boolean;
  isReplying?: boolean; // 답글 작성 중 상태 추가
  onReplyButtonClick?: () => void;
}

export default function CommentReaction({
  postId,
  commentId,
  userLiked = false,
  likeCnt = 0,
  replyCnt = 0,
  isReply = false,
  isReplying = false,
  onReplyButtonClick,
}: ReactionProps) {
  const { mutate: createPostLike } = useCreateCommentLike(commentId);
  const { mutate: deletePostLike } = useDeleteCommentLike(commentId);
  const [userLikedState, setUserLikedState] = useState<boolean>(userLiked);
  const [likeCntState, setLikeCntState] = useState<number>(likeCnt);
  const queryClient = useQueryClient();

  const handleLikeSuccess = () => {
    setUserLikedState(true);
    setLikeCntState((prev) => prev + 1);
    queryClient.invalidateQueries({
      queryKey: ['comments', postId],
    });
    console.log('좋아요 성공');
  };

  const handleDeleteLikeSuccess = () => {
    setUserLikedState(false);
    setLikeCntState((prev) => prev - 1);
    queryClient.invalidateQueries({
      queryKey: ['comments', postId],
    });
    console.log('좋아요 삭제 성공');
  };

  const handleError = (error: unknown) => {
    console.error('좋아요 처리 중 에러 발생:', error);
  };

  const handleLike = () => {
    if (userLikedState) {
      deletePostLike(undefined, {
        onSuccess: handleDeleteLikeSuccess,
        onError: handleError,
      });
    } else {
      createPostLike(undefined, {
        onSuccess: handleLikeSuccess,
        onError: handleError,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <ButtonOnToggle
        type="reaction"
        color="pink"
        iconLeft={<IconThumbUp />}
        text={likeCntState.toString()}
        isToggled={userLikedState}
        onToggle={handleLike}
      />
      {!isReply && (
        <ButtonOnToggle
          type="reaction"
          color="infoBlue"
          iconLeft={<IconChat />}
          text={replyCnt.toString()}
          isToggled={isReplying}
          onToggle={onReplyButtonClick}
        />
      )}
    </div>
  );
}
