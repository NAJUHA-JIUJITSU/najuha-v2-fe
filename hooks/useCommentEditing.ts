import { useState } from 'react';
import { ICommentSnapshot } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment-snapshot.interface';

export function useCommentEditing() {
  const [editingComment, setEditingComment] = useState<ICommentSnapshot['body'] | null>(null);

  const handleEditComment = (comment: ICommentSnapshot['body']) => {
    console.log('수정할 댓글:', comment);
    setEditingComment(comment);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  const handleSubmitComment = (text: string) => {
    if (editingComment) {
      console.log('수정된 댓글:', editingComment, text);
      setEditingComment(null);
    } else {
      console.log('새로운 댓글:', text);
    }
  };

  return {
    editingComment,
    handleEditComment,
    handleCancelEdit,
    handleSubmitComment,
  };
}
