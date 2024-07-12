import { useState, useEffect } from 'react';
import { ICommentSnapshot } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment-snapshot.interface';
import { TId } from 'najuha-v2-api/lib/common/common-types';

export function useCommentEditing(postId: TId) {
  const [editingComment, setEditingComment] = useState<{
    id: TId;
    body: ICommentSnapshot['body'];
    parentId?: TId;
  } | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState<TId | null>(null);
  const [isCommentingOnPost, setIsCommentingOnPost] = useState(false);

  const handleComment = () => {
    setIsFocused(true);
    setIsCommentingOnPost(true);
  };

  const handleEditComment = (commentId: TId, body: ICommentSnapshot['body']) => {
    console.log('수정할 댓글:', commentId, body);
    setEditingComment({ id: commentId, body });
    setIsFocused(true); // 포커스 설정
    setReplyingCommentId(null); // 부모 ID가 있으면 답글 작성 중 상태로 설정
    setIsCommentingOnPost(false);
  };

  const handleReplyComment = (parentId: TId) => {
    console.log('답글 작성 중:', parentId);
    setEditingComment({ id: parentId, body: '', parentId });
    setIsFocused(true); // 포커스 설정
    setReplyingCommentId(parentId); // 답글 작성 중 상태 설정ID가 있으면 답글 작성 중 상태로 설정
    setIsCommentingOnPost(false);
  };

  const handleCancelEdit = () => {
    setIsCommentingOnPost(false);
    setEditingComment(null);
    setIsFocused(false); // 포커스 해제
    setReplyingCommentId(null); // 답글 작성 중 상태 해제
  };

  const handleSubmitNewComment = (body: string) => {
    console.log('새로운 댓글 작성:', postId, body);
    // 여기에 새로운 댓글 작성 로직 추가
    // 예: API 호출을 통해 댓글을 서버에 저장
  };

  const handleSubmitEditComment = (commentId: TId, body: string) => {
    console.log('댓글 수정:', commentId, body);
    // 여기에 댓글 수정 로직 추가
    // 예: API 호출을 통해 댓글을 서버에서 업데이트
  };

  const handleSubmitReplyComment = (parentId: TId, body: string) => {
    console.log('답글 작성:', postId, parentId, body);
    // 여기에 답글 작성 로직 추가
    // 예: API 호출을 통해 답글을 서버에 저장
  };

  const handleSubmitComment = (text: string) => {
    if (editingComment) {
      if (editingComment.parentId) {
        // 답글 작성 로직
        handleSubmitReplyComment(editingComment.parentId, text);
      } else {
        // 댓글 수정 로직
        handleSubmitEditComment(editingComment.id, text);
      }
      setEditingComment(null);
    } else {
      // 새로운 댓글 작성 로직
      handleSubmitNewComment(text);
    }
    setIsCommentingOnPost(false);
    setIsFocused(false); // 포커스 해제
    setReplyingCommentId(null); // 답글 작성 중 상태 해제
  };

  // 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    console.log('isCommentingOnPost 상태 변경:', isCommentingOnPost);
  }, [isCommentingOnPost]);

  useEffect(() => {
    console.log('isFocused 상태 변경:', isFocused);
  }, [isFocused]);

  useEffect(() => {
    console.log('replyingCommentId 상태 변경:', replyingCommentId);
  }, [replyingCommentId]);

  useEffect(() => {
    console.log('editingComment 상태 변경:', editingComment);
  }, [editingComment]);

  return {
    editingComment,
    isCommentingOnPost,
    isFocused,
    replyingCommentId,
    handleComment,
    handleEditComment,
    handleReplyComment,
    handleCancelEdit,
    handleSubmitComment,
    setIsFocused, // 외부에서 포커스 상태를 설정할 수 있도록 함수 제공
  };
}
