import styles from './index.module.scss';
import Reaction from '@/components/reaction';
import IconMoreVert from '@/public/svgs/more_vert.svg';
import clsx from 'clsx';
import IconReply from '@/public/svgs/reply.svg';

interface BaseComment {
  id: number;
  nickname: string;
  date: Date;
  likeCnt: number;
  content: string;
  profile: string;
}

interface CommentInfo extends BaseComment {
  best: boolean;
  commentCnt?: number; // Optional로 변경
}

function isCommentInfo(comment: CommentInfo | BaseComment): comment is CommentInfo {
  return (comment as CommentInfo).best !== undefined;
}

export default async function Comment({
  commentInfo,
  type,
}: {
  commentInfo: CommentInfo | BaseComment;
  type: 'normal' | 'extra';
}) {
  return (
    <div className={styles.wrapper}>
      {type === 'extra' && (
        <div className={styles.extraIcon}>
          <IconReply />
        </div>
      )}
      <div className={styles.commentWrapper}>
        <div className={styles.top}>
          <div className={styles.left}>
            <img className={styles.profile} src={commentInfo.profile} alt="profile" />
            <div className={styles.name}>{commentInfo.nickname}</div>
            <div className={styles.date}>1년 전(수정됨)</div>
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
        <Reaction
          id={commentInfo.id}
          likeCnt={commentInfo.likeCnt}
          commentCnt={isCommentInfo(commentInfo) ? commentInfo.commentCnt : undefined}
        />
      </div>
    </div>
  );
}
