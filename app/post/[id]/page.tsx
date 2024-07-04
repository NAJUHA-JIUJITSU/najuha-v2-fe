'use client';
import React from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import { ThinDivider } from '@/components/divider';
import BaseLayout from '@/components/layout/baseLayout';
import { ButtonIconMoreVertForPost } from '@/components/common/icon/iconOnClick';
import { useUserID } from '@/hooks/user';
import { useGetPost } from '@/hooks/post';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import CommentList from '@/components/comments/commentList';

export default function PostId({ params }: { params: { id: TId } }) {
  const { data: post } = useGetPost(params.id);
  const { data: userInfo } = useUserID();

  if (!post) return null;

  return (
    <BaseLayout>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title="글페이지"
        rightIcon1={
          <ButtonIconMoreVertForPost id={params.id} isHost={post.post.user.id === userInfo?.id} />
        }
      />
      <Post postId={params.id} />
      <ThinDivider />
      <CommentList postId={params.id} postUserId={post.post.user.id} userId={userInfo?.id} />
    </BaseLayout>
  );
}
