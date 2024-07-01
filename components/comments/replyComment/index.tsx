import styles from '../index.module.scss';
import CommentReaction from '@/components/reactions/commentReaction';
import IconMoreVert from '@/public/svgs/moreVert.svg';
import IconReply from '@/public/svgs/reply.svg';
import { getPastTime } from '@/utils/dateUtils/dateCheck';
import { ICommentDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/comment.interface';

interface CommentProps {
  comment: ICommentDetail;
  writer?: boolean;
}

export default function ReplyComment({ comment, writer = false }: CommentProps) {
  // todo: 댓글수 받아오기
  const replyCnt = 2;
  return (
    <div className={styles.wrapper}>
      <div className={styles.extraIcon}>
        <IconReply />
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.top}>
          <div className={styles.left}>
            <img
              className={styles.profile}
              src={`http://localhost:9000/najuha-v2-bucket/${comment.user.profileImages[0].image.path}/${comment.user.profileImages[0].image.id}`}
              alt="profileImage"
            />
            <div className={styles.name}>
              {writer ? (
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
            <IconMoreVert />
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.content}>
            {comment.commentSnapshots[comment.commentSnapshots.length - 1].body}
          </div>
        </div>
        <CommentReaction
          postId={comment.postId}
          commentId={comment.id}
          likeCnt={comment.likeCount}
          userLiked={comment.userLiked}
          replyCnt={replyCnt} // todo: 댓글수 받아오기
          isReply={true}
        />
      </div>
    </div>
  );
}
