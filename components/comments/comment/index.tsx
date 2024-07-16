import { useState } from 'react';
import styles from '../index.module.scss';
import CommentReaction from '@/components/reactions/commentReaction';
import IconReply from '@/public/svgs/reply.svg';
import { getPastTime } from '@/utils/dateUtils/dateCheck';
import { ICommentDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment.interface';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import ReplyCommentList from '@/components/comments/replyCommentList';
import ButtonIconMoreVertForComment from '@/components/buttonIconMoreVerts/buttonIconMoreVertForComment';
import { ICommentSnapshot } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment-snapshot.interface';
import clsx from 'clsx';

interface CommentProps {
  postId: TId;
  postUserId: TId;
  comment: ICommentDetail | null;
  isWriter: boolean;
  isHost?: boolean;
  isBest?: boolean;
  isPreview?: boolean;
  handleEditComment: (id: TId, body: ICommentSnapshot['body'], parentId?: TId) => void;
  handleReplyComment: (parentId: TId) => void;
  isReplying?: boolean;
  editingComment?: {
    id: TId;
    body: ICommentSnapshot['body'];
    parentId?: TId;
  } | null;
}

export default function Comment({
  postId,
  postUserId,
  comment,
  isWriter,
  isHost = false,
  isBest = false,
  isPreview = false,
  handleEditComment,
  handleReplyComment,
  isReplying = false,
  editingComment,
}: CommentProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  if (!comment) return null;

  const isEditing = editingComment?.id === comment.id && editingComment.parentId === undefined;

  const handleEdit = () => {
    handleEditComment(
      comment.id,
      comment.commentSnapshots[comment.commentSnapshots.length - 1].body,
    );
  };

  const handleReplyClick = () => {
    handleReplyComment(comment.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.commentWrapper}>
        <div className={styles.top}>
          <div className={styles.left}>
            <img
              className={styles.profile}
              src={`http://localhost:9000/najuha-v2-bucket/${comment.user.profileImages[0].image.path}/${comment.user.profileImages[0].image.id}`}
              alt="profileImage"
            />
            <div className={styles.name}>
              {isWriter ? (
                <div className={styles.writer}>{comment.user.nickname}(글쓴이)</div>
              ) : (
                comment.user.nickname
              )}
            </div>
            <div className={styles.date}>
              {getPastTime(comment.createdAt)}
              {comment.commentSnapshots.length > 1 ? '(수정됨)' : ''}
            </div>
          </div>
          <div className={styles.right}>
            {!isPreview && (
              <ButtonIconMoreVertForComment
                commentId={comment.id}
                postId={postId}
                isHost={isHost}
                handleEditComment={handleEdit}
              />
            )}
          </div>
        </div>
        <div className={styles.middle}>
          {/**  BEST 댓글일 경우에만 노출 */}
          {isBest && <div className={styles.best}>BEST</div>}
          <div className={clsx(styles.content, { [styles.editingContent]: isEditing })}>
            {comment.commentSnapshots[comment.commentSnapshots.length - 1].body}
          </div>
        </div>
        {!isPreview && (
          <CommentReaction
            postId={comment.postId}
            commentId={comment.id}
            likeCnt={comment.likeCount}
            userLiked={comment.userLiked}
            replyCnt={comment.replyCount}
            onReplyButtonClick={handleReplyClick}
            isReplying={isReplying}
          />
        )}
        {comment.replyCount > 0 && !isPreview && !isReplyOpen && (
          <div className={styles.replyBtn}>
            <ButtonOnClick
              iconLeft={<IconReply />}
              text={`답글 ${comment.replyCount}개 더보기`}
              type="text"
              size="small"
              color="gray"
              onClick={() => setIsReplyOpen(true)}
            />
          </div>
        )}
        {isReplyOpen && (
          <ReplyCommentList
            postId={postId}
            postUserId={postUserId}
            commentId={comment.id}
            handleEditComment={handleEditComment}
            editingComment={editingComment}
          />
        )}
      </div>
    </div>
  );
}
