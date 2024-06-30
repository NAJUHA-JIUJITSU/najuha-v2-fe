import styles from './index.module.scss';
// import Reaction from '@/components/reaction';
import IconMoreVert from '@/public/svgs/moreVert.svg';
import IconReply from '@/public/svgs/reply.svg';
import { getPastTime } from '@/utils/dateUtils/dateCheck';
import { comment, replyComment } from '@/interfaces/comment';

function isCommentInfo(comment: comment | replyComment): comment is comment {
  return (comment as comment).best !== undefined;
}

interface CommentProps {
  commentInfo: comment | replyComment;
  type: 'comment' | 'reply';
  writer?: boolean;
}

export default function Comment({ commentInfo, type, writer = false }: CommentProps) {
  return (
    <div className={styles.wrapper}>
      {type === 'reply' && (
        <div className={styles.extraIcon}>
          <IconReply />
        </div>
      )}
      <div className={styles.commentWrapper}>
        <div className={styles.top}>
          <div className={styles.left}>
            <img className={styles.profile} src={commentInfo.profile} alt="profile" />
            <div className={styles.name}>
              {writer ? (
                <div className={styles.writer}>{commentInfo.nickname}(글쓴이)</div>
              ) : (
                commentInfo.nickname
              )}
            </div>
            <div className={styles.date}>
              {getPastTime(commentInfo.date)}
              {commentInfo.changed ? '(수정됨)' : ''}
            </div>
          </div>
          <div className={styles.right}>
            <IconMoreVert />
          </div>
        </div>
        <div className={styles.middle}>
          {/** isCommentInfo && BEST 댓글일 경우에만 노출 */}
          {isCommentInfo(commentInfo) && commentInfo.best && (
            <div className={styles.best}>BEST</div>
          )}
          <div className={styles.content}>{commentInfo.content}</div>
        </div>
        {/* todo: Reaction 컴포넌트에 함수전달해서 좋아요기능하게 ㄱㄱ */}
        {/* <Reaction
          likeCnt={commentInfo.likeCnt}
          commentCnt={isCommentInfo(commentInfo) ? commentInfo.commentCnt : undefined}
        /> */}
      </div>
    </div>
  );
}
