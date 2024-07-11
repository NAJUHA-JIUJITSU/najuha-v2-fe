'use client';
import React, { useState } from 'react';
import styles from '../index.module.scss';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';
import { useCreatePostLike, useDeletePostLike } from '@/hooks/post';
import { useQueryClient } from '@tanstack/react-query';

interface ReactionProps {
  postId: string;
  userLiked?: boolean;
  likeCnt?: number;
  commentCnt?: number;
  handleCommentButtonClick: () => void;
}

export default function PostReaction({
  postId,
  userLiked = false,
  likeCnt = 0,
  commentCnt = 0,
  handleCommentButtonClick,
}: ReactionProps) {
  const { mutate: createPostLike } = useCreatePostLike(postId);
  const { mutate: deletePostLike } = useDeletePostLike(postId);
  const [userLikedState, setUserLikedState] = useState<boolean>(userLiked);
  const [likeCntState, setLikeCntState] = useState<number>(likeCnt);
  const queryClient = useQueryClient();

  const handleLikeSuccess = () => {
    setUserLikedState(true);
    setLikeCntState((prev) => prev + 1);
    queryClient.invalidateQueries({
      queryKey: ['post', postId],
    });
    console.log('좋아요 성공');
  };

  const handleDeleteLikeSuccess = () => {
    setUserLikedState(false);
    setLikeCntState((prev) => prev - 1);
    queryClient.invalidateQueries({
      queryKey: ['post', postId],
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
      {
        <ButtonOnToggle
          type="reaction"
          color="infoBlue"
          iconLeft={<IconChat />}
          text={commentCnt.toString()}
          onToggle={handleCommentButtonClick}
        />
      }
    </div>
  );
}
