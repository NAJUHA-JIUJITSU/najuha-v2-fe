'use client';
import React, { useState } from 'react';
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
import CommentTextArea from '@/components/comments/commentTextArea';
import { ICommentDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment.interface';

export default function PostId({ params }: { params: { id: TId } }) {
  const { data: post } = useGetPost(params.id);
  const { data: userInfo } = useUserID();
  const [editingComment, setEditingComment] = useState<ICommentDetail | null>(null);

  if (!post) return null;

  const handleSubmitComment = (text: string) => {
    if (editingComment) {
      // 댓글 수정 로직
      console.log('수정된 댓글:', editingComment.id, text);
      setEditingComment(null);
    } else {
      // 새로운 댓글 작성 로직
      console.log('새로운 댓글:', text);
    }
  };

  const handleEditComment = (comment: ICommentDetail) => {
    setEditingComment(comment);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  return (
    <BaseLayout>
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
      <Post postId={params.id} />
      <ThinDivider />
      <CommentList
        postId={params.id}
        postUserId={post.post.user.id}
        userId={userInfo?.id}
        onEdit={handleEditComment}
      />
      <CommentTextArea
        isEditing={!!editingComment}
        initialText={
          editingComment
            ? editingComment.commentSnapshots[editingComment.commentSnapshots.length - 1].body
            : ''
        }
        onSubmit={handleSubmitComment}
        onCancel={handleCancelEdit}
      />
    </BaseLayout>
  );
}
