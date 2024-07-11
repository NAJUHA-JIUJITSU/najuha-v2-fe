'use client';
import React, { useState } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import { ThinDivider } from '@/components/divider';
import BaseLayout from '@/components/layout/baseLayout';
import ButtonIconMoreVertForPost from '@/components/buttonIconMoreVerts/buttonIconMoreVertForPost';
import { useUserID } from '@/hooks/user';
import { useGetPost } from '@/hooks/post';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import CommentList from '@/components/comments/commentList';
import CommentTextArea from '@/components/comments/commentTextArea';
import { useCommentEditing } from '@/hooks/useCommentEditing';

export default function PostId({ params }: { params: { id: TId } }) {
  const { data: post } = useGetPost(params.id);
  const { data: userInfo } = useUserID();
  const { editingComment, handleEditComment, handleCancelEdit, handleSubmitComment } =
    useCommentEditing();
  console.log('PostIdPage 렌더');

  const [isCommentAreaFocused, setCommentAreaFocus] = useState(false);

  const handleCommentButtonClick = () => {
    setCommentAreaFocus(true);
  };

  if (!post) return null;

  return (
    <BaseLayout isFooter={false}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title="글페이지"
        rightIcon1={
          <ButtonIconMoreVertForPost
            postId={params.id}
            isHost={post.post.user.id === userInfo?.id}
          />
        }
      />
      <Post postId={params.id} handleCommentButtonClick={handleCommentButtonClick} />
      <ThinDivider />
      <CommentList
        postId={params.id}
        postUserId={post.post.user.id}
        userId={userInfo?.id}
        handleEditComment={handleEditComment}
      />
      <CommentTextArea
        isFocused={isCommentAreaFocused}
        setFocus={setCommentAreaFocus}
        isEditing={!!editingComment}
        initialText={editingComment?.body ? editingComment.body : ''}
        onSubmit={handleSubmitComment}
        onCancel={handleCancelEdit}
      />
    </BaseLayout>
  );
}
