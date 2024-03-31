import styles from './index.module.scss';
import Reaction from '@/components/reaction';
import IconMoreVert from '@/public/svgs/more_vert.svg';

// we get commentInfo from parent component as props
// we don't need to fetch commentInfo from server
// we can use commentInfo directly
// set commentInfo type
interface CommentInfo {
  id: number;
  nickname: string;
  title: string;
  type: 'free' | 'seminar' | 'competition';
  date: Date;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  content: string;
  hot: boolean;
  profile: string;
}
export default async function Comment({ commentInfo }: { commentInfo: CommentInfo }) {
  return (
    <div className={styles.wrapper}>
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
        <div className={styles.best}>BEST</div>
        <div className={styles.content}>{commentInfo.content}</div>
      </div>
      <Reaction
        id={commentInfo.id}
        likeCnt={commentInfo.likeCnt}
        commentCnt={commentInfo.commentCnt}
      />
    </div>
  );
}
