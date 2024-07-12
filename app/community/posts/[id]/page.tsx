'use client';
import React from 'react';
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
  const {
    editingComment,
    isCommentingOnPost,
    isFocused: isCommentAreaFocused,
    replyingCommentId,
    handleComment,
    handleEditComment,
    handleReplyComment,
    handleCancelEdit,
    handleSubmitComment,
    setIsFocused: setCommentAreaFocus,
  } = useCommentEditing(params.id);

  console.log('PostIdPage 렌더');

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
      <Post
        postId={params.id}
        handleCommentButtonClick={handleComment}
        isCommentingOnPost={isCommentingOnPost}
      />
      <ThinDivider />
      <CommentList
        postId={params.id}
        postUserId={post.post.user.id}
        userId={userInfo?.id}
        editingComment={editingComment?.id || null}
        handleEditComment={handleEditComment}
        handleReplyComment={handleReplyComment}
        replyingCommentId={replyingCommentId}
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
