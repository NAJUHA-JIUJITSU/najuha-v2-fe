'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteComment } from '@/hooks/post';
import { ButtonIconMoreVert } from '@/components/common/icon/iconOnClick';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import { useQueryClient } from '@tanstack/react-query';

interface ButtonIconMoreVertForCommentProps {
  parentId?: TId;
  commentId: TId;
  postId: TId;
  isHost: boolean;
  handleEditComment: () => void;
}

export default function ButtonIconMoreVertForComment({
  parentId,
  commentId,
  postId,
  isHost,
  handleEditComment,
}: ButtonIconMoreVertForCommentProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deleteComment } = useDeleteComment();

  const hostDropdownList = [
    {
      label: '수정',
      onClick: () => {
        handleEditComment();
      },
    },
    { label: '삭제', onClick: () => handleDeletePost() },
  ];

  const normalDropdownList = [
    { label: '신고', onClick: () => router.push(`/community/posts/report/comment/${commentId}`) },
  ];

  const handleDeletePost = () => {
    deleteComment(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        queryClient.invalidateQueries({ queryKey: ['replies', parentId] });
      },
      onError: () => {
        console.error('댓글 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <ButtonIconMoreVert
      isHost={isHost}
      hostDropdownList={hostDropdownList}
      normalDropdownList={normalDropdownList}
    />
  );
}
