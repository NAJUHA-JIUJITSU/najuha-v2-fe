import { useState } from 'react';
import styles from '../index.module.scss';
import CommentReaction from '@/components/reactions/commentReaction';
import IconReply from '@/public/svgs/reply.svg';
import { getPastTime } from '@/utils/dateUtils/dateCheck';
import { ICommentDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment.interface';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import ReplyCommentList from '@/components/comments/replyCommentList';
import { ButtonIconMoreVertForComment } from '@/components/common/icon/iconOnClick';

interface CommentProps {
  postId: TId;
  postUserId: TId;
  comment: ICommentDetail;
  isWriter: boolean;
  isHost?: boolean;
  isBest?: boolean;
  isPreview?: boolean;
  onEdit?: (comment: ICommentDetail) => void;
}

export default function Comment({
  postId,
  postUserId,
  comment,
  isWriter,
  isHost = false,
  isBest = false,
  isPreview = false,
  onEdit,
}: CommentProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  // bug: 댓글수 받아왔지만, 댓글 수 0개여도 더 불러와짐.
  const replyCnt = 2;

  const handleEdit = () => {
    if (onEdit) onEdit(comment);
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
          <div className={styles.content}>
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
          />
        )}
        {replyCnt > 0 && !isPreview && !isReplyOpen && (
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
          <ReplyCommentList postId={postId} postUserId={postUserId} commentId={comment.id} />
        )}
      </div>
    </div>
  );
}
