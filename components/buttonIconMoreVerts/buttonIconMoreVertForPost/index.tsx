'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDeletePost } from '@/hooks/post';
import { ButtonIconMoreVert } from '@/components/common/icon/iconOnClick';
import { useQueryClient } from '@tanstack/react-query';

export default function ButtonIconMoreVertForPost({
  postId,
  isHost,
}: {
  postId: string;
  isHost: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deletePost } = useDeletePost();

  const hostDropdownList = [
    { label: '수정', onClick: () => router.push(`/community/posts/edit/${postId}`) },
    { label: '삭제', onClick: () => handleDeletePost() },
  ];

  const normalDropdownList = [
    { label: '신고', onClick: () => router.push(`/community/posts/report/post/${postId}`) },
  ];

  const handleDeletePost = () => {
    deletePost(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        router.push('/community');
      },
      onError: () => {
        console.error('게시글 삭제에 실패했습니다.');
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
